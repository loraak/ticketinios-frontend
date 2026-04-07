// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenSvc = inject(TokenService);
    const token = tokenSvc.getToken();

    if (token) {
        const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(authReq);
    }

    return next(req);
};