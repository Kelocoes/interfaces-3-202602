import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { PERMISSIONS_KEY } from '../../decorators/permissions.decorator';
import { User } from '../../entities/user.entity';

interface AuthenticatedRequest extends Request {
    user?: User;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // 1. Extraemos los permisos requeridos del m�todo manejador
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('Usuario no autenticado en la solicitud');
        }

        const userPermissions = user.role?.rolePermissions?.map((rp) => rp.permission.name) ?? [];
        const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
            userPermissions.includes(permission),
        );

        if (!hasAllRequiredPermissions) {
            throw new ForbiddenException('Acceso denegado: No cuentas con los permisos suficientes para esta acci�n');
        }
        return true;
    }
}
