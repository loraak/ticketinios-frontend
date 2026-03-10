import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { MessageService, ConfirmationService } from 'primeng/api';
import { PERMISOS, Permiso } from '../../services/auth.service';

export interface UsuarioAdmin {
    id: string;
    nombreCompleto: string;
    email: string;
    password: string;
    permisos: Permiso[];
    activo: boolean;
}

export interface PermisoLegible {
    permiso: Permiso;
    label: string;
    grupo: string;
}

export const PERMISOS_LEGIBLES: PermisoLegible[] = [
    // Perfil
    { permiso: PERMISOS.PERFIL_EDITAR,            label: 'Editar perfil',                grupo: 'Perfil'           },
    { permiso: PERMISOS.PERFIL_BAJA,              label: 'Dar de baja perfil',            grupo: 'Perfil'           },
    // Grupos CRUD
    { permiso: PERMISOS.GROUPS_ADMIN,             label: 'Administrar grupos',            grupo: 'Grupos'           },
    { permiso: PERMISOS.GROUPS_VER,               label: 'Ver grupos',                    grupo: 'Grupos'           },
    { permiso: PERMISOS.GROUPS_CREAR,             label: 'Crear grupos',                  grupo: 'Grupos'           },
    { permiso: PERMISOS.GROUPS_EDITAR,            label: 'Editar grupos',                 grupo: 'Grupos'           },
    { permiso: PERMISOS.GROUPS_BAJA,              label: 'Dar de baja grupos',            grupo: 'Grupos'           },
    // Grupos detalle
    { permiso: PERMISOS.GROUPS_VER_ESPECIFICO,    label: 'Ver grupo específico',          grupo: 'Grupos — Detalle' },
    { permiso: PERMISOS.GROUPS_DETALLE_CREAR,     label: 'Agregar miembros al grupo',     grupo: 'Grupos — Detalle' },
    { permiso: PERMISOS.GROUPS_DETALLE_EDITAR,    label: 'Editar miembros del grupo',     grupo: 'Grupos — Detalle' },
    { permiso: PERMISOS.GROUPS_DETALLE_BAJA,      label: 'Eliminar miembros del grupo',   grupo: 'Grupos — Detalle' },
    { permiso: PERMISOS.GROUPS_MIS_TICKETS,       label: 'Ver mis tickets del grupo',     grupo: 'Grupos — Detalle' },
    // Usuarios
    { permiso: PERMISOS.USUARIOS_VER,             label: 'Ver usuarios',                  grupo: 'Usuarios'         },
    { permiso: PERMISOS.USUARIOS_CREAR,           label: 'Crear usuarios',                grupo: 'Usuarios'         },
    { permiso: PERMISOS.USUARIOS_EDITAR,          label: 'Editar usuarios',               grupo: 'Usuarios'         },
    { permiso: PERMISOS.USUARIOS_BAJA,            label: 'Dar de baja usuarios',          grupo: 'Usuarios'         },
    // Tickets
    { permiso: PERMISOS.TICKETS_VER,              label: 'Ver tickets',                   grupo: 'Tickets'          },
    { permiso: PERMISOS.TICKETS_AGREGAR,          label: 'Crear tickets',                 grupo: 'Tickets'          },
    { permiso: PERMISOS.TICKETS_ADMIN,            label: 'Administrar tickets',           grupo: 'Tickets'          },
    { permiso: PERMISOS.TICKETS_EDITAR,           label: 'Editar tickets',                grupo: 'Tickets'          },
    { permiso: PERMISOS.TICKETS_ELIMINAR,         label: 'Eliminar tickets',              grupo: 'Tickets'          },
    { permiso: PERMISOS.TICKETS_DETALLE,          label: 'Ver detalle de tickets',        grupo: 'Tickets'          },
    // Superadmin
    { permiso: PERMISOS.SUPERADMIN_VER,           label: 'Ver panel superadmin',          grupo: 'Superadmin'       },
    { permiso: PERMISOS.SUPERADMIN_CREAR,         label: 'Crear en superadmin',           grupo: 'Superadmin'       },
    { permiso: PERMISOS.SUPERADMIN_EDITAR,        label: 'Editar en superadmin',          grupo: 'Superadmin'       },
    { permiso: PERMISOS.SUPERADMIN_BAJA,          label: 'Dar de baja en superadmin',     grupo: 'Superadmin'       },
];

@Component({
    selector: 'app-superadmin',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, PasswordModule, CheckboxModule,
        DividerModule, TooltipModule,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './superadmin.html',
    styleUrl: './superadmin.css'
})
export class Superadmin {
    protected PERMISOS_LEGIBLES = PERMISOS_LEGIBLES;

    // Grupos únicos para separar visualmente los permisos en el modal
    get gruposPermisos(): string[] {
        return [...new Set(PERMISOS_LEGIBLES.map(p => p.grupo))];
    }

    permisosPorGrupo(grupo: string): PermisoLegible[] {
        return PERMISOS_LEGIBLES.filter(p => p.grupo === grupo);
    }

    usuarios: UsuarioAdmin[] = [
        {
            id: '1', nombreCompleto: 'César Admin', email: 'admin@app.com',
            password: '123', activo: true,
            permisos: [
                PERMISOS.PERFIL_EDITAR, PERMISOS.PERFIL_BAJA,
                PERMISOS.GROUPS_ADMIN, PERMISOS.GROUPS_VER, PERMISOS.GROUPS_CREAR, PERMISOS.GROUPS_EDITAR, PERMISOS.GROUPS_BAJA,
                PERMISOS.GROUPS_VER_ESPECIFICO, PERMISOS.GROUPS_DETALLE_CREAR, PERMISOS.GROUPS_DETALLE_EDITAR, PERMISOS.GROUPS_DETALLE_BAJA,
                PERMISOS.USUARIOS_VER, PERMISOS.USUARIOS_CREAR, PERMISOS.USUARIOS_EDITAR, PERMISOS.USUARIOS_BAJA,
                PERMISOS.TICKETS_ADMIN, PERMISOS.TICKETS_VER, PERMISOS.TICKETS_AGREGAR, PERMISOS.TICKETS_EDITAR, PERMISOS.TICKETS_ELIMINAR, PERMISOS.TICKETS_DETALLE,
            ],
        },
        {
            id: '2', nombreCompleto: 'César Usuario', email: 'usuario@app.com',
            password: '123', activo: true,
            permisos: [
                PERMISOS.PERFIL_EDITAR,
                PERMISOS.GROUPS_VER, PERMISOS.GROUPS_VER_ESPECIFICO, PERMISOS.GROUPS_CREAR,
                PERMISOS.GROUPS_DETALLE_CREAR, PERMISOS.GROUPS_DETALLE_EDITAR, PERMISOS.GROUPS_DETALLE_BAJA, PERMISOS.GROUPS_MIS_TICKETS,
                PERMISOS.TICKETS_VER, PERMISOS.TICKETS_AGREGAR, PERMISOS.TICKETS_EDITAR, PERMISOS.TICKETS_ELIMINAR, PERMISOS.TICKETS_DETALLE,
            ],
        },
        {
            id: '3', nombreCompleto: 'César SuperAdmin', email: 'superadmin@app.com',
            password: '123', activo: true,
            permisos: Object.values(PERMISOS) as Permiso[],
        },
    ];

    // — Modal permisos —
    modalPermisosVisible = false;
    usuarioSeleccionado: UsuarioAdmin | null = null;
    permisosSeleccionados: Permiso[] = [];

    // — Modal usuario —
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

    // — Permisos —
    abrirPermisos(usuario: UsuarioAdmin) {
        this.usuarioSeleccionado = usuario;
        this.permisosSeleccionados = [...usuario.permisos];
        this.modalPermisosVisible = true;
    }

    tienePermiso(permiso: Permiso): boolean {
        return this.permisosSeleccionados.includes(permiso);
    }

    togglePermiso(permiso: Permiso) {
        if (this.tienePermiso(permiso)) {
            this.permisosSeleccionados = this.permisosSeleccionados.filter(p => p !== permiso);
        } else {
            this.permisosSeleccionados = [...this.permisosSeleccionados, permiso];
        }
    }

    seleccionarTodos() {
        this.permisosSeleccionados = Object.values(PERMISOS) as Permiso[];
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

    // — CRUD usuarios —
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

    confirmarEliminar(usuario: UsuarioAdmin) {
        this.confirmationService.confirm({
            message: `¿Eliminar permanentemente a "${usuario.nombreCompleto}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
                this.messageService.add({ severity: 'error', summary: 'Eliminado', detail: `"${usuario.nombreCompleto}" eliminado.` });
            }
        });
    }
}