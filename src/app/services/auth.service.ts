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

    constructor() {
        const usuarioGuardado = localStorage.getItem('usuario');
        const payload = this.tokenSvc.getDecodedPayload();

        if (payload && usuarioGuardado) {
            const expirado = payload.exp * 1000 < Date.now();
            if (expirado) {
                this.tokenSvc.setToken('');
                localStorage.removeItem('usuario');
                return;
            }
            this._usuario.set(JSON.parse(usuarioGuardado));
            this.permsSvc.setPermissions(payload?.permisos ?? []);
        }
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:3000/api/auth/login',
            { email, password },
            { withCredentials: true }
        ).pipe(
            tap((response: any) => {
                const usuario = response.data[0].usuario;
                this.tokenSvc.setToken(usuario.token);

                const payload = this.tokenSvc.getDecodedPayload();
                const usuarioCompleto = { ...payload, ...usuario };

                this._usuario.set(usuarioCompleto);
                localStorage.setItem('usuario', JSON.stringify(usuarioCompleto)); // ← persiste
                this.permsSvc.setPermissions(payload?.permisos ?? []);
            })
        );
    }

    actualizarUsuario(datos: Partial<any>) {
        this._usuario.update(actual => {
            const actualizado = { ...actual, ...datos };
            localStorage.setItem('usuario', JSON.stringify(actualizado));
            return actualizado;
        });
    }

    logout() {
        this.tokenSvc.setToken('');
        localStorage.removeItem('usuario');
        this.permsSvc.setPermissions([]);
        this._usuario.set(null);
    }
}