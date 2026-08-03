import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(userId: number, code?: string) {
        super({
            error: 'User Not Found',
            message: `User with ID ${userId} does not exist`,
            code,
        });
    }
}
