import { Injectable, signal, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
    private userPermissions = signal<string[]>([]);
    private http = inject(HttpClient);

    setPermissions(perms: string[]) {
        this.userPermissions.set(perms);
    }

    hasPermission(permiso: string): boolean {
        return this.userPermissions().includes(permiso);
    }

    hasAnyPermission(perms: string[]): boolean {
        return perms.some(p => this.hasPermission(p));
    }

    hasAnyGroupPermission(grupoId: string, permisos: string[]): Observable<boolean> {
        return this.http.get<any>(`http://localhost:3000/api/grupos/${grupoId}/permisos`).pipe(
            map((res: any) => {
                const permisosGrupo: string[] = res.data ?? [];
                return permisos.some(p => permisosGrupo.includes(p));
            }),
            catchError(() => of(false))
        );
    }
}