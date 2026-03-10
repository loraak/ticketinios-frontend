import { Injectable, signal, computed } from '@angular/core';

export type Rol = 'admin' | 'usuario';

export const PERMISOS = {
    // Perfil
    PERFIL_EDITAR:  'perfil:editar',
    PERFIL_BAJA:    'perfil:baja',
    // Grupos
    GROUPS_VER:     'groups:ver',
    GROUPS_ADMIN:   'groups:admin',
    // CRUD
    CRUD_VER:       'crud:ver',
    CRUD_CREAR:     'crud:crear',
    CRUD_EDITAR:    'crud:editar',
    CRUD_ELIMINAR:  'crud:eliminar',
    // USUARIOS
    USUARIOS_ADMIN: 'usuarios:admin'
} as const;

export type Permiso = typeof PERMISOS[keyof typeof PERMISOS];

const ROL_PERMISOS: Record<Rol, Permiso[]> = {
    admin: Object.values(PERMISOS) as Permiso[],
    usuario: [
        PERMISOS.PERFIL_EDITAR,
        PERMISOS.GROUPS_VER,
        PERMISOS.CRUD_VER,
    ],
};

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    password: string;
    rol: Rol;
}

const USUARIOS_MOCK: Usuario[] = [
    { id: '1', nombre: 'César Admin',   email: 'admin@app.com',   password: '123', rol: 'admin'   },
    { id: '2', nombre: 'César Usuario', email: 'usuario@app.com', password: '123', rol: 'usuario' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _usuario = signal<Usuario | null>(null);

    readonly usuario      = this._usuario.asReadonly();
    readonly estaLogueado = computed(() => this._usuario() !== null);
    readonly rol          = computed(() => this._usuario()?.rol ?? null);
    readonly permisos     = computed((): Permiso[] => {
        const u = this._usuario();
        return u ? ROL_PERMISOS[u.rol] : [];
    });

    tienePermiso(permiso: Permiso): boolean {
        return this.permisos().includes(permiso);
    }

    tieneAlgunPermiso(lista: Permiso[]): boolean {
        return lista.some(p => this.tienePermiso(p));
    }

    tieneRol(rol: Rol): boolean {
        return this.rol() === rol;
    }

    login(email: string, password: string): boolean {
        const usuario = USUARIOS_MOCK.find(u => u.email === email && u.password === password);
        if (!usuario) return false;

        this._usuario.set(usuario);
        return true;
    }

    logout(): void {
        this._usuario.set(null);
    }
}