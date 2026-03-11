import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
    private userPermissions = signal<string[]>([]);

    setPermissions(perms: string[]) {
        this.userPermissions.set(perms);
    }

    hasPermission(permiso: string): boolean {
        return this.userPermissions().includes(permiso);
    }

    hasAnyPermission(perms: string[]): boolean {
        return perms.some(p => this.hasPermission(p));
    }
}