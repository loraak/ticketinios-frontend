import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
    setToken(token: string) {
        if (token) {
            localStorage.setItem('jwt', token);
        } else {
            localStorage.removeItem('jwt');
        }
    }
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
}