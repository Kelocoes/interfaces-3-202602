import { RolePermissionService } from '../services/role-permission.service';
import { AssignPermissionDto } from '../dto/assign-permission.dto';
import { RemovePermissionDto } from '../dto/remove-permission.dto';

import { Controller, Post, Body, Delete } from '@nestjs/common';

@Controller('role-permissions')
export class RolePermissionController {
    constructor(
        private readonly rolePermissionService: RolePermissionService,
    ) {}

    @Post('assign')
    async assignPermissionToRole(
        @Body() assignPermissionDto: AssignPermissionDto,
    ) {
        const { roleId, permissionId } = assignPermissionDto;
        return await this.rolePermissionService.assignPermissionToRole(
            roleId,
            permissionId,
        );
    }

    @Delete('remove')
    async removePermissionFromRole(
        @Body() removePermissionDto: RemovePermissionDto,
    ) {
        const { roleId, permissionId } = removePermissionDto;
        await this.rolePermissionService.removePermissionFromRole(
            roleId,
            permissionId,
        );
        return { message: 'Permission removed from role successfully' };
    }
}
