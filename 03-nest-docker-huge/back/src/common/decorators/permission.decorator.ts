import { SetMetadata } from '@nestjs/common';

export const Permissions = (...perms: string[]) =>
    SetMetadata('permissions', perms);
