import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { HasPermissionDirective } from '../../directives/has-permission.directive'; 

export interface UsuarioAdmin {
    id: string;
    nombreCompleto: string;
    email: string;
    password: string;
    permisos: string[];
    activo: boolean;
}

export interface PermisoLegible {
    permiso: string;
    label: string;
    grupo: string;
}

export const PERMISOS_LEGIBLES: PermisoLegible[] = [
    // Perfil
    { permiso: 'perfil:editar',           label: 'Editar perfil',                grupo: 'Perfil'           },
    { permiso: 'perfil:baja',             label: 'Dar de baja perfil',           grupo: 'Perfil'           },
    // Grupos CRUD
    { permiso: 'groups:admin',            label: 'Administrar grupos',           grupo: 'Grupos'           },
    { permiso: 'groups:ver',              label: 'Ver grupos',                   grupo: 'Grupos'           },
    { permiso: 'groups:crear',            label: 'Crear grupos',                 grupo: 'Grupos'           },
    { permiso: 'groups:editar',           label: 'Editar grupos',                grupo: 'Grupos'           },
    { permiso: 'groups:baja',             label: 'Dar de baja grupos',           grupo: 'Grupos'           },
    // Grupos detalle
    { permiso: 'groups:verespecifico',    label: 'Ver grupo específico',         grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:crear',     label: 'Agregar miembros al grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:editar',    label: 'Editar miembros del grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:baja',      label: 'Eliminar miembros del grupo',  grupo: 'Grupos — Detalle' },
    { permiso: 'groups:mistickets',       label: 'Ver mis tickets del grupo',    grupo: 'Grupos — Detalle' },
    // Usuarios
    { permiso: 'usuarios:ver',            label: 'Ver usuarios',                 grupo: 'Usuarios'         },
    { permiso: 'usuarios:crear',          label: 'Crear usuarios',               grupo: 'Usuarios'         },
    { permiso: 'usuarios:editar',         label: 'Editar usuarios',              grupo: 'Usuarios'         },
    { permiso: 'usuarios:baja',           label: 'Dar de baja usuarios',         grupo: 'Usuarios'         },
    // Tickets
    { permiso: 'tickets:ver',             label: 'Ver tickets',                  grupo: 'Tickets'          },
    { permiso: 'tickets:agregar',         label: 'Crear tickets',                grupo: 'Tickets'          },
    { permiso: 'tickets:admin',           label: 'Administrar tickets',          grupo: 'Tickets'          },
    { permiso: 'tickets:editar',          label: 'Editar tickets',               grupo: 'Tickets'          },
    { permiso: 'tickets:eliminar',        label: 'Eliminar tickets',             grupo: 'Tickets'          },
    { permiso: 'tickets:detalle',         label: 'Ver detalle de tickets',       grupo: 'Tickets'          }
];

@Component({
    selector: 'app-superadmin',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, PasswordModule, CheckboxModule,
        DividerModule, TooltipModule, HasPermissionDirective
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './superadmin.html',
    styleUrl: './superadmin.css'
})
export class Superadmin {
    protected PERMISOS_LEGIBLES = PERMISOS_LEGIBLES;

    get gruposPermisos(): string[] {
        return [...new Set(PERMISOS_LEGIBLES.map(p => p.grupo))];
    }

    permisosPorGrupo(grupo: string): PermisoLegible[] {
        return PERMISOS_LEGIBLES.filter(p => p.grupo === grupo);
    }

    usuarios: UsuarioAdmin[] = [
        {
            id: '1', nombreCompleto: 'Jonathan Joestar', email: 'jonathan@gmail.com',
            password: '123', activo: true,
            permisos: [
                'perfil:editar', 'perfil:baja', 'groups:admin', 'groups:ver', 'groups:crear', 'groups:editar', 'groups:baja',
                'groups:verespecifico', 'ticket:crear', 'ticket:editar', 'ticket:baja',
                'usuarios:ver', 'usuarios:crear', 'usuarios:editar', 'usuarios:baja',
                'tickets:admin', 'tickets:ver', 'tickets:agregar', 'tickets:editar', 'tickets:eliminar', 'tickets:detalle'
            ]
        },
        {
            id: '2', nombreCompleto: 'Giorno Giovanna', email: 'giorno@gmail.com',
            password: '123', activo: true,
            permisos: [
                'perfil:editar', 'groups:ver', 'groups:verespecifico', 'groups:crear',
                'ticket:crear', 'ticket:editar', 'ticket:baja', 'groups:mistickets',
                'tickets:ver', 'tickets:agregar', 'tickets:editar', 'tickets:eliminar', 'tickets:detalle'
            ]
        },
        {
            id: '3', nombreCompleto: 'Dio Brando', email: 'dio@gmail.com',
            password: '123', activo: true,
            permisos: PERMISOS_LEGIBLES.map(p => p.permiso),
        },
    ];

    modalPermisosVisible = false;
    usuarioSeleccionado: UsuarioAdmin | null = null;
    permisosSeleccionados: string[] = [];

    modalUsuarioVisible = false;
    modoEdicion = false;
    usuarioEnEdicion: UsuarioAdmin | null = null;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.form = this.fb.group({
            nombreCompleto: ['', Validators.required],
            email:          ['', [Validators.required, Validators.email]],
            password:       ['', Validators.required],
        });
    }

    abrirPermisos(usuario: UsuarioAdmin) {
        this.usuarioSeleccionado = usuario;
        this.permisosSeleccionados = [...usuario.permisos];
        this.modalPermisosVisible = true;
    }

    tienePermiso(permiso: string): boolean {
        return this.permisosSeleccionados.includes(permiso);
    }

    togglePermiso(permiso: string) {
        if (this.tienePermiso(permiso)) {
            this.permisosSeleccionados = this.permisosSeleccionados.filter(p => p !== permiso);
        } else {
            this.permisosSeleccionados = [...this.permisosSeleccionados, permiso];
        }
    }

    seleccionarTodos() {
        this.permisosSeleccionados = PERMISOS_LEGIBLES.map(p => p.permiso);
    }

    limpiarTodos() {
        this.permisosSeleccionados = [];
    }

    todosDelGrupoSeleccionados(grupo: string): boolean {
        return this.permisosPorGrupo(grupo).every(p => this.tienePermiso(p.permiso));
    }

    toggleGrupo(grupo: string) {
        const permisosGrupo = this.permisosPorGrupo(grupo).map(p => p.permiso);
        if (this.todosDelGrupoSeleccionados(grupo)) {
            this.permisosSeleccionados = this.permisosSeleccionados.filter(p => !permisosGrupo.includes(p));
        } else {
            const nuevos = permisosGrupo.filter(p => !this.permisosSeleccionados.includes(p));
            this.permisosSeleccionados = [...this.permisosSeleccionados, ...nuevos];
        }
    }

    guardarPermisos() {
        const idx = this.usuarios.findIndex(u => u.id === this.usuarioSeleccionado!.id);
        this.usuarios[idx] = { ...this.usuarios[idx], permisos: [...this.permisosSeleccionados] };
        this.usuarios = [...this.usuarios];
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Permisos actualizados.' });
        this.modalPermisosVisible = false;
    }

    abrirNuevo() {
        this.modoEdicion = false;
        this.usuarioEnEdicion = null;
        this.form.reset();
        this.form.get('password')!.setValidators(Validators.required);
        this.form.get('password')!.updateValueAndValidity();
        this.modalUsuarioVisible = true;
    }

    abrirEditar(usuario: UsuarioAdmin) {
        this.modoEdicion = true;
        this.usuarioEnEdicion = usuario;
        this.form.patchValue({ ...usuario, password: '' });
        this.form.get('password')!.clearValidators();
        this.form.get('password')!.updateValueAndValidity();
        this.modalUsuarioVisible = true;
    }

    guardarUsuario() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        if (this.modoEdicion && this.usuarioEnEdicion) {
            const valores = this.form.value;
            const idx = this.usuarios.findIndex(u => u.id === this.usuarioEnEdicion!.id);
            this.usuarios[idx] = {
                ...this.usuarioEnEdicion,
                ...valores,
                password: valores.password || this.usuarioEnEdicion.password,
            };
            this.usuarios = [...this.usuarios];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado.' });
        } else {
            this.usuarios = [...this.usuarios, {
                id: crypto.randomUUID(),
                ...this.form.value,
                permisos: [],
                activo: true,
            }];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado.' });
        }
        this.modalUsuarioVisible = false;
    }

    confirmarBaja(usuario: UsuarioAdmin) {
        this.confirmationService.confirm({
            message: `¿Dar de baja a "${usuario.nombreCompleto}"?`,
            header: 'Confirmar Baja',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, dar de baja',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                const idx = this.usuarios.findIndex(u => u.id === usuario.id);
                this.usuarios[idx] = { ...this.usuarios[idx], activo: false };
                this.usuarios = [...this.usuarios];
                this.messageService.add({ severity: 'warn', summary: 'Baja', detail: `"${usuario.nombreCompleto}" dado de baja.` });
            }
        });
    }
}