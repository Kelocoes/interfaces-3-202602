import { NotFoundException } from '@nestjs/common';

// Un solo 404 reutilizable: "no existe el recurso X con id Y"
export class ResourceNotFoundException extends NotFoundException {
    constructor(resource: string, id: number) {
        super({
            error: `${resource} Not Found`,
            message: `${resource} con identificador ${id} no fue encontrado.`,
        });
    }
}