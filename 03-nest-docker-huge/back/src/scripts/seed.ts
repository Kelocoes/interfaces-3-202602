import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../auth/entities/role.entity';
import { Permission } from '../auth/entities/permission.entity';
import { RolePermission } from '../auth/entities/role-permission.entity';
dotenv.config();

type SupportedDbTypes =
    | 'mysql'
    | 'postgres'
    | 'sqlite'
    | 'mariadb'
    | 'mongodb'
    | 'oracle';

const AppDataSource = new DataSource({
    type: (process.env.DB_TYPE as SupportedDbTypes) || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'test',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
});

async function seed() {
    await AppDataSource.initialize();

    await AppDataSource.query('DELETE FROM users');
    await AppDataSource.query('DELETE FROM role_permissions');
    await AppDataSource.query('DELETE FROM roles');
    await AppDataSource.query('DELETE FROM permissions');

    const adminRole = AppDataSource.manager.create(Role, {
        name: 'admin',
        description: 'Administrador con todos los permisos',
    });
    const userRole = AppDataSource.manager.create(Role, {
        name: 'user',
        description: 'Usuario estándar con permisos limitados',
    });
    await AppDataSource.manager.save([adminRole, userRole]);

    const permissions = [
        {
            name: 'user_create',
            description: 'Permiso para crear usuarios',
        },
        {
            name: 'user_read',
            description: 'Permiso para leer usuarios',
        },
        {
            name: 'user_update',
            description: 'Permiso para actualizar usuarios',
        },
        {
            name: 'user_delete',
            description: 'Permiso para borrar usuarios',
        },
    ].map((perm) => AppDataSource.manager.create(Permission, perm));
    await AppDataSource.manager.save(permissions);

    // Asignar permisos al admin (todos)
    const adminRolePermissions = permissions.map((perm) =>
        AppDataSource.manager.create(RolePermission, {
            role: adminRole,
            permission: perm,
        }),
    );

    // Asignar permisos al usuario (solo leer y actualizar)
    const userRolePermissions = permissions
        .filter(
            (perm) => perm.name === 'user_read' || perm.name === 'user_update',
        )
        .map((perm) =>
            AppDataSource.manager.create(RolePermission, {
                role: userRole,
                permission: perm,
            }),
        );

    await AppDataSource.manager.save([
        ...adminRolePermissions,
        ...userRolePermissions,
    ]);

    const saltRounds = 10;
    const hashedPassword1 = await bcrypt.hash('password123', saltRounds);
    const hashedPassword2 = await bcrypt.hash('userpass456', saltRounds);

    const users = [
        {
            username: 'admin',
            email: 'admin@mail.com',
            passwordHash: hashedPassword1,
            role: adminRole,
        },
        {
            username: 'user',
            email: 'user@mail.com',
            passwordHash: hashedPassword2,
            role: userRole,
        },
    ];
    await AppDataSource.manager.save(User, users);

    console.log('Seed completo');
    await AppDataSource.destroy();
}

seed().catch((error) => {
    console.error('Error en el seed:', error);
    void AppDataSource.destroy();
});
