import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionsService } from '../services/permissions.service';

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.estaLogueado()) return router.createUrlTree(['/login']);
    return true;
};

export function permisoGuard(permiso: string): CanActivateFn {
    return () => {
        const auth = inject(AuthService);
        const permsSvc = inject(PermissionsService);
        const router = inject(Router);

        if (!auth.estaLogueado()) return router.createUrlTree(['/login']);
        if (!permsSvc.hasPermission(permiso)) return router.createUrlTree(['/app/home']);
        return true;
    };
}