import { Routes } from '@angular/router';
import { authGuard, permisoGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '',        redirectTo: 'login', pathMatch: 'full' },
    { path: 'login',   loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
    { path: 'register',loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) },
    {
        path: 'app',
        loadComponent: () => import('./pages/layout/layout').then(m => m.Layout),
        canActivate: [authGuard],
        children: [
            { path: '',       redirectTo: 'home', pathMatch: 'full' }, 
            { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil) },
            { path: 'home',   loadComponent: () => import('./pages/crud/crud').then(m => m.Groups) },
            { path: 'usuarios',   canActivate: [permisoGuard('usuarios:ver')],   loadComponent: () => import('./pages/crud-usuarios/crud-usuarios').then(m => m.Usuarios) },
            { path: 'tickets', canActivate: [permisoGuard('tickets:ver')],  loadComponent: () => import('./pages/tickets/tickets').then(m => m.Tickets) },
            { path: 'groupDetails',   canActivate: [permisoGuard('groups:verespecifico')],   loadComponent: () => import('./pages/group-detail/group-detail').then(m => m.GroupDetail) },
            { path: 'superadmin', canActivate: [permisoGuard('usuario:ver')], loadComponent: () => import('./pages/superadmin/superadmin').then(m => m.Superadmin)},
        ]
    },
    { path: '**', redirectTo: 'landing' } 
];