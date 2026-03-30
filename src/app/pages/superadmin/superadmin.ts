import { Component, OnInit, inject } from '@angular/core';
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
import { UsuarioService } from '../../services/usuario.service';

export interface UsuarioAdmin {
    id: string;
    nombreCompleto: string;
    email: string;
    permisos: string[];
    activo: boolean;
}

export interface PermisoLegible {
    permiso: string;
    label: string;
    grupo: string;
}

export const PERMISOS_LEGIBLES: PermisoLegible[] = [
    { permiso: 'perfil:editar',           label: 'Editar perfil',                grupo: 'Perfil'           },
    { permiso: 'perfil:baja',             label: 'Dar de baja perfil',           grupo: 'Perfil'           },
    { permiso: 'groups:admin',            label: 'Administrar grupos',           grupo: 'Grupos'           },
    { permiso: 'groups:ver',              label: 'Ver grupos',                   grupo: 'Grupos'           },
    { permiso: 'groups:crear',            label: 'Crear grupos',                 grupo: 'Grupos'           },
    { permiso: 'groups:editar',           label: 'Editar grupos',                grupo: 'Grupos'           },
    { permiso: 'groups:baja',             label: 'Dar de baja grupos',           grupo: 'Grupos'           },
    { permiso: 'groups:verespecifico',    label: 'Ver grupo específico',         grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:crear',            label: 'Agregar miembros al grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:editar',           label: 'Editar miembros del grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'ticket:baja',             label: 'Eliminar miembros del grupo',  grupo: 'Grupos — Detalle' },
    { permiso: 'groups:mistickets',       label: 'Ver mis tickets del grupo',    grupo: 'Grupos — Detalle' },
    { permiso: 'usuarios:ver',            label: 'Ver usuarios',                 grupo: 'Usuarios'         },
    { permiso: 'usuarios:crear',          label: 'Crear usuarios',               grupo: 'Usuarios'         },
    { permiso: 'usuarios:editar',         label: 'Editar usuarios',              grupo: 'Usuarios'         },
    { permiso: 'usuarios:baja',           label: 'Dar de baja usuarios',         grupo: 'Usuarios'         },
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
export class Superadmin implements OnInit {
    protected PERMISOS_LEGIBLES = PERMISOS_LEGIBLES;

    private usuarioSvc = inject(UsuarioService);

    usuarios: UsuarioAdmin[] = [];

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
            usuario:        ['', Validators.required],
            nombreCompleto: ['', Validators.required],
            email:          ['', [Validators.required, Validators.email]],
            password:       ['', Validators.required],
            direccion:      ['', Validators.required],
            fechaNacimiento:['', Validators.required],
            telefono:       ['', Validators.required],
        });
    }

    ngOnInit() {
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        this.usuarioSvc.listar().subscribe({
            next: (data) => this.usuarios = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios.' })
        });
    }

    get gruposPermisos(): string[] {
        return [...new Set(PERMISOS_LEGIBLES.map(p => p.grupo))];
    }

    permisosPorGrupo(grupo: string): PermisoLegible[] {
        return PERMISOS_LEGIBLES.filter(p => p.grupo === grupo);
    }

    // — Permisos —

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
        this.usuarioSvc.actualizarPermisos(this.usuarioSeleccionado!.id, this.permisosSeleccionados).subscribe({
            next: () => {
                const idx = this.usuarios.findIndex(u => u.id === this.usuarioSeleccionado!.id);
                this.usuarios[idx] = { ...this.usuarios[idx], permisos: [...this.permisosSeleccionados] };
                this.usuarios = [...this.usuarios];
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Permisos actualizados.' });
                this.modalPermisosVisible = false;
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron actualizar los permisos.' })
        });
    }

    // — Usuarios —

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
            this.usuarioSvc.editar(this.usuarioEnEdicion.id, this.form.value).subscribe({
                next: () => {
                    this.cargarUsuarios();
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado.' });
                    this.modalUsuarioVisible = false;
                },
                error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error al actualizar.' })
            });
        } else {
            this.usuarioSvc.crear(this.form.value).subscribe({
                next: () => {
                    this.cargarUsuarios();
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado.' });
                    this.modalUsuarioVisible = false;
                },
                error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error al crear.' })
            });
        }
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
                this.usuarioSvc.darDeBaja(usuario.id).subscribe({
                    next: () => {
                        this.cargarUsuarios();
                        this.messageService.add({ severity: 'warn', summary: 'Baja', detail: `"${usuario.nombreCompleto}" dado de baja.` });
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo dar de baja.' })
                });
            }
        });
    }
}