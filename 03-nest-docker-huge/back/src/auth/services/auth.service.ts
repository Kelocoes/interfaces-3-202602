import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { UserLoginDto } from '../dto/user-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        const matches = await bcrypt.compare(password, user.passwordHash);
        if (!matches) throw new UnauthorizedException('Invalid credentials');
        /* Deberías omitir el password al retornarselo al usuario o,o */
        return user;
    }

    async login(userLoginDto: UserLoginDto) {
        const user = await this.validateUser(
            userLoginDto.email,
            userLoginDto.password,
        );

        const permissions = user.role.rolePermissions.map(
            (rp) => rp.permission.name,
        );
        const payload = { sub: user.id, email: user.email, permissions };
        return { access_token: this.jwtService.sign(payload) };
    }
}
