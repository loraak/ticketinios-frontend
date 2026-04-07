import { Injectable, inject, signal, computed } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private permsSvc = inject(PermissionsService);
    private tokenSvc = inject(TokenService);
    private http = inject(HttpClient);
    private _usuario = signal<any | null>(null);
    readonly usuario = this._usuario.asReadonly();
    readonly estaLogueado = computed(() => this._usuario() !== null);

    login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true }
    ).pipe(
        tap((response: any) => {
        const usuario = response.data[0].usuario; 
        const token = usuario.token; 
        this.tokenSvc.setToken(token);
        this._usuario.set(usuario);
        this.permsSvc.setPermissions(usuario.permisos || []);
    })
    );
    }

    logout() {
        localStorage.removeItem('jwt');
        this.permsSvc.setPermissions([]);
        this._usuario.set(null);
    }
}