import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermissionController } from './controllers/role-permission.controller';
import { RolePermissionService } from './services/role-permission.service';
import { RolePermission } from './entities/role-permission.entity';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './services/jwt.strategy.service';

@Module({
    controllers: [
        RolesController,
        PermissionsController,
        RolePermissionController,
        AuthController,
    ],
    providers: [
        RolesService,
        PermissionsService,
        RolePermissionService,
        AuthService,
        JwtStrategy,
    ],
    imports: [
        TypeOrmModule.forFeature([Role, Permission, RolePermission]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET') || 'defaultSecret',
                signOptions: {
                    expiresIn:
                        config.get<string | number>('JWT_EXPIRES_IN') || '1h',
                },
            }),
        }),
        forwardRef(() => UsersModule),
    ],
    exports: [RolesService, PermissionsService],
})
export class AuthModule {}
