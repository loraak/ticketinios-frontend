import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
    setToken(token: string) { localStorage.setItem('jwt', token); }
    getToken() { return localStorage.getItem('jwt'); }

    getDecodedPayload(): any | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    }

    generateMockToken(): string {
        
        const payloadAdmin = {
            id: '1', nombreCompleto: 'César Admin', email: 'admin@app.com',
            permisos: [
                'perfil:editar', 'perfil:baja', 'groups:admin', 'groups:ver', 'groups:crear', 'groups:editar', 'groups:baja',
                'groups:verespecifico', 'groups:detail:crear', 'groups:detail:editar', 'groups:detail:baja',
                'usuarios:ver', 'usuarios:crear', 'usuarios:editar', 'usuarios:baja',
                'tickets:admin', 'tickets:ver', 'tickets:agregar', 'tickets:editar', 'tickets:eliminar', 'tickets:detalle'
            ]
        };

        const payloadUsuario = {
            id: '2', nombreCompleto: 'César Usuario', email: 'usuario@app.com',
            permisos: [
                'perfil:editar', 'groups:ver', 'groups:verespecifico', 'groups:crear',
                'groups:detail:crear', 'groups:detail:editar', 'groups:detail:baja', 'groups:mistickets',
                'tickets:ver', 'tickets:agregar', 'tickets:editar', 'tickets:eliminar', 'tickets:detalle'
            ]
        };

        const payloadSuperAdmin = {
            id: '3', nombreCompleto: 'César SuperAdmin', email: 'superadmin@app.com',
            permisos: [
                'perfil:editar', 'perfil:baja', 'groups:admin', 'groups:ver', 'groups:crear', 'groups:editar', 'groups:baja', 
                'groups:verespecifico', 'groups:detail:crear', 'groups:detail:editar', 'groups:detail:baja', 'groups:mistickets', 
                'usuarios:ver', 'usuarios:crear', 'usuarios:editar', 'usuarios:baja', 
                'tickets:ver', 'tickets:agregar', 'tickets:admin', 'tickets:editar', 'tickets:eliminar', 'tickets:detalle', 
                'superadmin:ver', 'superadmin:editar', 'superadmin:baja', 'superadmin:crear'
            ]
        };

        const payloadActivo = payloadAdmin; 

        return `header.${btoa(JSON.stringify(payloadActivo))}.signature`;
    }
}