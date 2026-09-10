import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UserModule, RoleModule],
})
export class AuthModule {}
