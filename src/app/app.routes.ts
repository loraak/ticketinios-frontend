import { Routes } from '@angular/router';
import { authGuard, permisoGuard } from './guards/auth.guard';
import { PERMISOS } from './services/auth.service';

export const routes: Routes = [
    { path: '',        redirectTo: 'landing', pathMatch: 'full' },
    { path: 'login',   loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
    { path: 'landing', loadComponent: () => import('./pages/landing/landing').then(m => m.Landing) },
    { path: 'register',loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) },
    {
        path: 'app',
        loadComponent: () => import('./pages/layout/layout').then(m => m.Layout),
        canActivate: [authGuard],
        children: [
            { path: '',       redirectTo: 'home', pathMatch: 'full' }, 
            { path: 'home',   loadComponent: () => import('./pages/home/home').then(m => m.Home) },
            { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil) },
            { path: 'crud',   canActivate: [permisoGuard(PERMISOS.CRUD_VER)],   loadComponent: () => import('./pages/crud/crud').then(m => m.Groups) },
            { path: 'usuarios',   canActivate: [permisoGuard(PERMISOS.USUARIOS_ADMIN)],   loadComponent: () => import('./pages/crud-usuarios/crud-usuarios').then(m => m.Usuarios) },
        ]
    },
    { path: '**', redirectTo: 'landing' } 
];