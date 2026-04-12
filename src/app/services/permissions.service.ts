import { Injectable, signal, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
    private http = inject(HttpClient);
    private permissions = signal<string[]>([]);
    private groupPermissions = signal<string[]>([]); 
    private grupoPermissionsCache = signal<Record<string, string[]>>({});

    setPermissions(perms: string[]) {
        this.permissions.set(perms);
    }

    setGroupPermissions(perms: string[]) {
        this.groupPermissions.set(perms);
    }

    hasPermission(permission: string): boolean {
        return this.permissions().includes(permission);
    }

    hasAnyPermission(perms: string[]): boolean {
        return perms.some(p => this.permissions().includes(p));
    }

    hasGroupPermission(permission: string): boolean {
        return this.groupPermissions().includes(permission);
    }

    hasAnyGroupPermission(perms: string[]): boolean {
        return perms.some(p => this.groupPermissions().includes(p));
    }

    refreshPermissionsForGroup(groupId: string, onDone?: () => void): void {
        this.http.get<any>(`${environment.apiUrl}/api/grupos/${groupId}/permisos`).subscribe({
            next: (res) => {
                const permisos = res.data ?? [];
                // ← guarda en caché por grupoId
                this.grupoPermissionsCache.update(cache => ({
                    ...cache,
                    [groupId]: permisos
                }));
                this.groupPermissions.set(permisos);
                onDone?.();
            },
            error: () => {
                this.groupPermissions.set([]);
                onDone?.();
            }
        });
    }

    hasPermissionInGroup(groupId: string, permiso: string): boolean {
        return this.grupoPermissionsCache()[groupId]?.includes(permiso) ?? false;
    }

    clearGroupPermissions() {
        this.groupPermissions.set([]);
        this.grupoPermissionsCache.set({});
    }
}