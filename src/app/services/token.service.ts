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
            id: '1', nombreCompleto: 'Jonathan Joestar', email: 'jonathan@gmail.com',
            permisos: [
                'perfil:editar', 'perfil:baja', 'groups:agregar', 'groups:admin', 'groups:ver', 'groups:crear', 'groups:editar', 'groups:baja',
                'groups:verespecifico', 'ticket:crear', 'ticket:editar', 'ticket:baja',
                'usuarios:ver', 'usuarios:crear', 'usuarios:editar', 'usuarios:baja'
            ]
        };

        const payloadUsuario = {
            id: '2', nombreCompleto: 'Giorno Giovanna', email: 'giorno@gmail.com',
            permisos: [
                'perfil:editar', 'perfil:baja', 'groups:ver', 'groups:verespecifico', 'groups:crear',
                'ticket:crear', 'ticket:editar', 'ticket:baja', 'groups:mistickets'
            ]
        };

        const payloadSuperAdmin = {
            id: '3', nombreCompleto: 'Dio Brando', email: 'dio@gmail.com',
            permisos: [
                'perfil:editar', 'perfil:baja', 'groups:agregar' ,'groups:admin', 'groups:ver', 'groups:crear', 'groups:editar', 'groups:baja', 'ticket:crear',
                'groups:verespecifico', '', 'ticket:editar', 'ticket:baja', 'groups:mistickets', 
                'usuarios:ver', 'usuarios:crear', 'usuarios:editar', 'usuarios:baja',
                'usuario:ver', 'usuario:editar', 'usuario:baja', 'usuario:crear', 'usuario:gestionarpermisos'
            ]
        };

        const payloadActivo = payloadSuperAdmin; 

        return `header.${btoa(JSON.stringify(payloadActivo))}.signature`;
    }
}