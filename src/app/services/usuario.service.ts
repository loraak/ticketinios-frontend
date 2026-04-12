import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

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
    private base = `${environment.apiUrl}/api/usuarios`;

    listar(): Observable<UsuarioAdmin[]> {
        return this.http.get<any>(this.base, { withCredentials: true }).pipe(
            map((response: any) => response.data) 
        );
    }

    crear(data: any): Observable<UsuarioAdmin> {
        return this.http.post<any>(this.base, data, { withCredentials: true }).pipe(
            map((response: any) => response.data[0])
        );
    }

    editar(id: string, data: any): Observable<UsuarioAdmin> {
        return this.http.put<any>(`${this.base}/${id}`, data, { withCredentials: true }).pipe(
            map((response: any) => response.data[0])
        );
    }

    darDeBaja(id: string): Observable<any> {
        return this.http.patch(`${this.base}/${id}/baja`, {}, { withCredentials: true });
    }

    actualizarPermisos(id: string, permisos: string[]): Observable<any> {
        return this.http.put(`${this.base}/${id}/permisos`, permisos, { withCredentials: true });
    }
}