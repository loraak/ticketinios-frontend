import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenSvc = inject(TokenService);
    const router = inject(Router);
    const token = tokenSvc.getToken();

    const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((error) => {
            if (error.status === 401) {
                tokenSvc.setToken('');
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};