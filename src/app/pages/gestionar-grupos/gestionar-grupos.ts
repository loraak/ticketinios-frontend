import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';

import { PermissionsService } from '../../services/permissions.service'; 
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

export interface UsuarioSistema {
    id: string;
    nombreCompleto: string;
    username: string;
    email: string;
    activo: boolean;
}

export interface GrupoAdmin {
    id: string;
    nombre: string;
    descripcion: string;
    creador: string;
    integrantes: number;
    activo: boolean;
}

export interface MiembroGrupo {
    usuarioId: string;
    nombreCompleto: string;
}

@Component({
    selector: 'app-gestion-grupos',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, MultiSelectModule, DividerModule,
        TooltipModule, HasPermissionDirective, CheckboxModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './gestionar-grupos.html',
    styleUrl: './gestionar-grupos.css'
})
export class GestionarGrupos implements OnInit {
    private http             = inject(HttpClient);
    private messageService   = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private cdr              = inject(ChangeDetectorRef);
    protected permissionsSvc = inject(PermissionsService);

    grupos:   GrupoAdmin[]    = [];
    usuarios: UsuarioSistema[] = [];
    loading = false;

    // Modal agregar miembro
    modalMiembrosVisible = false;
    grupoSeleccionado: GrupoAdmin | null = null;
    miembrosActuales: MiembroGrupo[] = [];
    usuariosSeleccionados: string[] = []; // IDs

    // Modal permisos
    modalPermisosVisible = false;
    miembroSeleccionado: MiembroGrupo | null = null;
    permisosDisponibles = [
        'tickets:crear',
        'tickets:editar',
        'tickets:eliminar',
        'tickets:comentario',
        'grupos:editar',
        'grupos:eliminar',
    ];
    permisosSeleccionados: string[] = [];

    ngOnInit() {
        this.cargarGrupos();
        this.cargarUsuarios();
    }

    cargarGrupos() {
        this.loading = true;
        this.http.get<any>(`${environment.apiUrl}/api/grupos/admin`).subscribe({
            next: (res) => {
                this.grupos = res.data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => this.loading = false
        });
    }

    cargarUsuarios() {
        this.http.get<any>(`${environment.apiUrl}/api/usuarios`).subscribe({
            next: (res) => {
                this.usuarios = res.data;
                this.cdr.detectChanges(); // ← agrega esto
            }
        });
    }

    abrirModalMiembros(grupo: GrupoAdmin) {
        this.grupoSeleccionado = grupo;
        this.usuariosSeleccionados = [];

        this.http.get<any>(`${environment.apiUrl}/api/grupos/${grupo.id}/miembros`).subscribe({
            next: (res) => {
                this.miembrosActuales = res.data;
                this.usuariosSeleccionados = res.data.map((m: MiembroGrupo) => m.usuarioId);
                this.modalMiembrosVisible = true;
                this.cdr.detectChanges();
            }
        });
    }

    guardarMiembros() {
        if (!this.grupoSeleccionado) return;

        const miembrosActualesIds = this.miembrosActuales.map(m => m.usuarioId);
        const agregar = this.usuariosSeleccionados.filter(id => !miembrosActualesIds.includes(id));
        const quitar  = miembrosActualesIds.filter(id => !this.usuariosSeleccionados.includes(id));

        const peticiones = [
            ...agregar.map(id => {
                const usuario = this.usuarios.find(u => u.id === id);
                return this.http.post(`${environment.apiUrl}/api/grupos/${this.grupoSeleccionado!.id}/miembros`, {
                    usuarioId: id,
                    nombreCompleto: usuario?.nombreCompleto
                });
            }),
            ...quitar.map(id =>
                this.http.delete(`${environment.apiUrl}/api/grupos/${this.grupoSeleccionado!.id}/miembros/${id}`)
            )
        ];

        if (peticiones.length === 0) {
            this.modalMiembrosVisible = false;
            return;
        }

        Promise.all(peticiones.map(p => p.toPromise())).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Miembros actualizados.' });
            this.modalMiembrosVisible = false;
            this.cargarGrupos();
        }).catch(() => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar miembros.' });
        });
    }

    abrirModalPermisos(grupo: GrupoAdmin, miembro: MiembroGrupo) {
        this.grupoSeleccionado = grupo;
        this.miembroSeleccionado = miembro;

        this.http.get<any>(`${environment.apiUrl}/api/grupos/${grupo.id}/permisos/${miembro.usuarioId}`).subscribe({
            next: (res) => {
                this.permisosSeleccionados = res.data ?? [];
                this.modalPermisosVisible = true;
                this.cdr.detectChanges();
            }
        });
    }

    guardarPermisos() {
        if (!this.grupoSeleccionado || !this.miembroSeleccionado) return;

        this.http.put(
            `${environment.apiUrl}/api/grupos/${this.grupoSeleccionado.id}/permisos/${this.miembroSeleccionado.usuarioId}`,
            { permisos: this.permisosSeleccionados }
        ).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Permisos actualizados.' });
                this.modalPermisosVisible = false;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar permisos.' });
            }
        });
    }

    confirmarEliminarGrupo(grupo: GrupoAdmin) {
        this.confirmationService.confirm({
            message: `¿${grupo.activo ? 'Dar de baja' : 'Dar de alta'} el grupo "${grupo.nombre}"?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: grupo.activo ? 'danger' : 'success' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                this.http.patch(`${environment.apiUrl}/api/grupos/admin/estado/${grupo.id}`, {}).subscribe({
                    next: () => {
                        this.grupos = this.grupos.map(g =>
                            g.id === grupo.id ? { ...g, activo: !g.activo } : g
                        );
                        this.messageService.add({
                            severity: grupo.activo ? 'warn' : 'success',
                            summary: grupo.activo ? 'Baja' : 'Alta',
                            detail: `Grupo "${grupo.nombre}" dado de ${grupo.activo ? 'baja' : 'alta'}.`
                        });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar el estado del grupo.' });
                    }
                });
            }
        });
    }
}