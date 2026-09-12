import { NotFoundException } from '@nestjs/common';

/**
 * Excepción personalizada lanzada cuando un rol solicitado no existe.
 */
export class RoleNotFoundException extends NotFoundException {
    constructor(roleIdOrName: number | string) {
        super({
            error: 'Role Not Found',
            message: `El rol con identificador o nombre '${roleIdOrName}' no existe en el sistema.`,
        });
    }
}
