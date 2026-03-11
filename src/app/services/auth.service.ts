import { Injectable, inject, signal, computed } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private permsSvc = inject(PermissionsService);
    private tokenSvc = inject(TokenService);

    private _usuario = signal<any | null>(null);
    readonly usuario = this._usuario.asReadonly();
    readonly estaLogueado = computed(() => this._usuario() !== null);

    loginSimulado() {
        const token = this.tokenSvc.generateMockToken();
        this.tokenSvc.setToken(token);
        this.procesarToken();
    }

    cargarSesion() {
        this.procesarToken();
    }

    logout() {
        localStorage.removeItem('jwt');
        this.permsSvc.setPermissions([]);
        this._usuario.set(null);
    }

    private procesarToken() {
        const payload = this.tokenSvc.getDecodedPayload();
        if (payload) {
            this.permsSvc.setPermissions(payload.permisos || []); 
            this._usuario.set({ 
                id: payload.id, 
                nombreCompleto: payload.nombreCompleto, 
                email: payload.email 
            });
        }
    }
}