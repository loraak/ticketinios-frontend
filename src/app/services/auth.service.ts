import { Injectable, signal, computed } from '@angular/core';

export const PERMISOS = {
    //  Perfil - Aún no sé cómo manejarlos. 
    PERFIL_EDITAR:  'perfil:editar',
    PERFIL_BAJA:    'perfil:baja',
    //  CRUD de Grupos. 
    GROUPS_ADMIN: 'groups:admin', 
    GROUPS_VER:     'groups:ver',
    GROUPS_CREAR:   'groups:crear',
    GROUPS_EDITAR:  'groups:editar',
    GROUPS_BAJA:    'groups:baja',
    //  GRUPO DETALLES. 
    GROUPS_VER_ESPECIFICO: 'groups:verespecifico',
    GROUPS_DETALLE_CREAR: 'groups:detail:crear',
    GROUPS_DETALLE_EDITAR: 'groups:detail:editar', 
    GROUPS_DETALLE_BAJA: 'groups:detail:baja', 
    GROUPS_MIS_TICKETS: 'groups:mistickets', 
    //  Usuarios
    USUARIOS_VER:    'usuarios:ver',      
    USUARIOS_CREAR:  'usuarios:crear',    
    USUARIOS_EDITAR: 'usuarios:editar',   
    USUARIOS_BAJA:   'usuarios:baja',  
    //  TICKETS
    TICKETS_VER: 'tickets:ver', 
    TICKETS_AGREGAR: 'tickets:agregar', 
    TICKETS_ADMIN:   'tickets:admin',
    TICKETS_EDITAR: 'tickets:editar', 
    TICKETS_ELIMINAR: 'tickets:eliminar',
    TICKETS_DETALLE: 'tickets:detalle' 
} as const;

export type Permiso = typeof PERMISOS[keyof typeof PERMISOS];

export interface Usuario {
    id: string;
    nombreCompleto: string;
    email: string;
    password: string;
    permisos: Permiso[];
}

const USUARIOS_MOCK: Usuario[] = [
    {
        id: '1',
        nombreCompleto: 'César Admin',
        email: 'admin@app.com',
        password: '123',
        permisos: [
            PERMISOS.PERFIL_EDITAR,
            PERMISOS.PERFIL_BAJA,
            //  CRUD de grupos. 
            PERMISOS.GROUPS_ADMIN, 
            PERMISOS.GROUPS_VER,
            PERMISOS.GROUPS_CREAR, 
            PERMISOS.GROUPS_EDITAR, 
            PERMISOS.GROUPS_BAJA, 
            //  GRUPOS DETALLES. 
            PERMISOS.GROUPS_VER_ESPECIFICO,
            PERMISOS.GROUPS_DETALLE_CREAR,
            PERMISOS.GROUPS_DETALLE_EDITAR, 
            PERMISOS.GROUPS_DETALLE_BAJA, 
            //  CRUD DE USUARIOS
            PERMISOS.USUARIOS_VER,
            PERMISOS.USUARIOS_CREAR,
            PERMISOS.USUARIOS_EDITAR,
            PERMISOS.USUARIOS_BAJA,
            //  CRUD DE TICKETS. 
            PERMISOS.TICKETS_ADMIN,
            PERMISOS.TICKETS_VER,
            PERMISOS.TICKETS_AGREGAR,
            PERMISOS.TICKETS_EDITAR,
            PERMISOS.TICKETS_ELIMINAR, 
            PERMISOS.TICKETS_DETALLE 
        ],
    },
    {
        id: '2',
        nombreCompleto: 'César Usuario',
        email: 'usuario@app.com',
        password: '123',
        permisos: [
            //  Perfil
            PERMISOS.PERFIL_EDITAR,
            //  GRUPOS.
            PERMISOS.GROUPS_VER,
            PERMISOS.GROUPS_VER_ESPECIFICO,
            PERMISOS.GROUPS_CREAR,
            //  GRUPOS DETALLES. 
            PERMISOS.GROUPS_DETALLE_CREAR,
            PERMISOS.GROUPS_DETALLE_EDITAR, 
            PERMISOS.GROUPS_DETALLE_BAJA, 
            PERMISOS.GROUPS_MIS_TICKETS, 
            //  TICKETS. 
            PERMISOS.TICKETS_VER,
            PERMISOS.TICKETS_AGREGAR,
            PERMISOS.TICKETS_EDITAR,
            PERMISOS.TICKETS_ELIMINAR, 
            PERMISOS.TICKETS_DETALLE 
        ],
    },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _usuario = signal<Usuario | null>(null);

    readonly usuario      = this._usuario.asReadonly();
    readonly estaLogueado = computed(() => this._usuario() !== null);
    readonly permisos     = computed(() => this._usuario()?.permisos ?? []);

    tienePermiso(permiso: Permiso): boolean {
        return this.permisos().includes(permiso);
    }

    tieneAlgunPermiso(lista: Permiso[]): boolean {
        return lista.some(p => this.tienePermiso(p));
    }

    login(email: string, password: string): boolean {
        const usuario = USUARIOS_MOCK.find(
            u => u.email === email && u.password === password
        );
        if (!usuario) return false;
        this._usuario.set(usuario);
        return true;
    }

    logout(): void {
        this._usuario.set(null);
    }
}