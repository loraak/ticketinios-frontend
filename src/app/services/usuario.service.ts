import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioAdmin {
    id: string;
    nombreCompleto: string;
    email: string;
    activo: boolean;
    permisos: string[];
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private http = inject(HttpClient);
    private base = 'http://localhost:8081/api/usuarios';

    listar(): Observable<UsuarioAdmin[]> {
        return this.http.get<UsuarioAdmin[]>(this.base, { withCredentials: true });
    }

    crear(data: any): Observable<UsuarioAdmin> {
        return this.http.post<UsuarioAdmin>(this.base, data, { withCredentials: true });
    }

    editar(id: string, data: any): Observable<UsuarioAdmin> {
        return this.http.put<UsuarioAdmin>(`${this.base}/${id}`, data, { withCredentials: true });
    }

    darDeBaja(id: string): Observable<any> {
        return this.http.patch(`${this.base}/${id}/baja`, {}, { withCredentials: true });
    }

    actualizarPermisos(id: string, permisos: string[]): Observable<any> {
        return this.http.put(`${this.base}/${id}/permisos`, permisos, { withCredentials: true });
    }
}