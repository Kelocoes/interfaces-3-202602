import { NotFoundException } from '@nestjs/common';

export class RoleNotFoundException extends NotFoundException {
    constructor(roleId: number | string) {
        super({
            error: 'Role Not Found',
            message: `Role with ID/Name ${roleId} does not exist`,
        });
    }
}
