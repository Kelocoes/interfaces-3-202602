import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../auth/services/roles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../auth/entities/role.entity';
import {
    UserNotFoundException,
} from '../common/exceptions';
import { AppLogger } from '../common/logger/logger.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private rolesService: RolesService,
        private readonly logger: AppLogger,
    ) {}

    async create(createUserDto: CreateUserDto) {
        this.logger.debug(`Creating user with email: ${createUserDto.email}`);
        
        let role: Role | null = null;
        if (createUserDto.roleName) {
            role = await this.rolesService.findByName(createUserDto.roleName);
        }

        const newUser = this.userRepository.create({
            username: createUserDto.username,
            email: createUserDto.email,
            passwordHash: createUserDto.passwordHash,
            bio: createUserDto.bio ?? '',
            role: role ?? undefined,
        });
        return await this.userRepository.save(newUser);
    }

    findAll() {
        return this.userRepository.find();
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: [
                'role',
                'role.rolePermissions',
                'role.rolePermissions.permission',
            ],
        });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const userExist = await this.userRepository.findOne({ where: { id } });
        if (!userExist) {
            throw new UserNotFoundException(id, 'P20250');
        }
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (!result.affected || result.affected === 0) {
            throw new UserNotFoundException(id);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: { email },
            relations: [
                'role',
                'role.rolePermissions',
                'role.rolePermissions.permission',
            ],
        });
    }
}
