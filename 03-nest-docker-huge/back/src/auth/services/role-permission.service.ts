import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private rolePermissionRepository: Repository<RolePermission>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
    ) {}

    async assignPermissionToRole(
        roleId: number,
        permissionId: number,
    ): Promise<RolePermission> {
        const role = await this.roleRepository.findOne({
            where: { id: roleId },
        });
        const permission = await this.permissionRepository.findOne({
            where: { id: permissionId },
        });

        if (!role || !permission) {
            throw new Error('Role or Permission not found');
        }

        const rolePermission = this.rolePermissionRepository.create({
            role,
            permission,
        });
        return await this.rolePermissionRepository.save(rolePermission);
    }

    async removePermissionFromRole(
        roleId: number,
        permissionId: number,
    ): Promise<void> {
        const role = await this.roleRepository.findOne({
            where: { id: roleId },
        });
        const permission = await this.permissionRepository.findOne({
            where: { id: permissionId },
        });

        if (!role || !permission) {
            throw new Error('Role or Permission not found');
        }

        const rolePermission = await this.rolePermissionRepository.findOne({
            where: { role, permission },
        });

        if (!rolePermission) {
            throw new Error('Permission not assigned to role');
        }

        await this.rolePermissionRepository.delete({ role, permission });
    }
}
