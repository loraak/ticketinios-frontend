import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
import { PermissionsService } from '../../services/permissions.service';
import { HttpClient } from '@angular/common/http';

export interface UsuarioAdmin {
    id: string;
    nombreCompleto: string;
    username: string;
    email: string;
    telefono: string;
    direccion: string;
    fechaNacimiento: string;
    permisos: string[];
    activo: boolean;
}

export interface PermisoLegible {
    permiso: string;
    label: string;
    grupo: string;
}

@Component({
    selector: 'app-gestion-usuarios',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, PasswordModule, CheckboxModule,
        DividerModule, TooltipModule, HasPermissionDirective
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './gestionar-usuarios.html',
    styleUrl: './gestionar-usuarios.css'
})
export class GestionarUsuarios implements OnInit {
    private http                = inject(HttpClient);
    private messageService      = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private cdr                 = inject(ChangeDetectorRef);
    protected permissionsSvc    = inject(PermissionsService);

    usuarios: UsuarioAdmin[] = [];
    loading = false;

    // Modal editar
    modalUsuarioVisible = false;
    modoEdicion = false;
    usuarioSeleccionado: UsuarioAdmin | null = null;

    form: FormGroup;

    // Modal permisos
    modalPermisosVisible = false;
    permisosSeleccionados: string[] = [];

    PERMISOS_LEGIBLES: PermisoLegible[] = [];

    get gruposPermisos(): string[] {
        return [...new Set(this.PERMISOS_LEGIBLES.map(p => p.grupo))];
    }

    permisosPorGrupo(grupo: string): PermisoLegible[] {
        return this.PERMISOS_LEGIBLES.filter(p => p.grupo === grupo);
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

    todosDelGrupoSeleccionados(grupo: string): boolean {
        return this.permisosPorGrupo(grupo).every(p => this.tienePermiso(p.permiso));
    }

    toggleGrupo(grupo: string) {
        const permisos = this.permisosPorGrupo(grupo).map(p => p.permiso);
        if (this.todosDelGrupoSeleccionados(grupo)) {
            this.permisosSeleccionados = this.permisosSeleccionados.filter(p => !permisos.includes(p));
        } else {
            const nuevos = permisos.filter(p => !this.permisosSeleccionados.includes(p));
            this.permisosSeleccionados = [...this.permisosSeleccionados, ...nuevos];
        }
    }

    seleccionarTodos() {
        this.permisosSeleccionados = this.PERMISOS_LEGIBLES.map(p => p.permiso);
    }

    limpiarTodos() {
        this.permisosSeleccionados = [];
    }

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            nombreCompleto:  ['', Validators.required],
            email:           ['', [Validators.required, Validators.email]],
            usuario:         ['', Validators.required],
            direccion:       ['', Validators.required],
            fechaNacimiento: ['', Validators.required],
            telefono:        ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            password:        ['', Validators.required]
        });
    }

    ngOnInit() {
        this.cargarUsuarios();
        this.cargarPermisos(); 
    }

    cargarUsuarios() {
        this.loading = true;
        this.http.get<any>('http://localhost:3000/api/usuarios').subscribe({
            next: (res) => {
                this.usuarios = res.data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => this.loading = false
        });
    }

    cargarPermisos() {
        this.http.get<any>('http://localhost:3000/api/usuarios/permisos').subscribe({
            next: (res) => {
                this.PERMISOS_LEGIBLES = res.data.map((p: any) => ({
                    permiso: p.nombre,        // ajusta según lo que devuelve tu API
                    label:   p.descripcion ?? p.nombre,
                    grupo:   p.grupo ?? 'General'
                }));
                this.cdr.detectChanges();
            }
        });
    }

    abrirNuevo() {
        this.modoEdicion = false;
        this.usuarioSeleccionado = null;
        this.form.reset();
        this.form.get('direccion')?.setValidators(Validators.required);
        this.form.get('fechaNacimiento')?.setValidators(Validators.required);
        this.form.get('telefono')?.setValidators([Validators.required, Validators.pattern('^[0-9]{10}$')]);
        this.form.get('password')?.setValidators(Validators.required);
        this.form.updateValueAndValidity();
        this.modalUsuarioVisible = true;
    }

    abrirEditar(usuario: UsuarioAdmin) {
        this.modoEdicion = true;
        this.usuarioSeleccionado = usuario;

        // Quita validators de campos que no se editan
        this.form.get('direccion')?.clearValidators();
        this.form.get('fechaNacimiento')?.clearValidators();
        this.form.get('telefono')?.clearValidators();
        this.form.get('password')?.clearValidators();
        this.form.updateValueAndValidity();

        this.form.patchValue({
            nombreCompleto: usuario.nombreCompleto,
            email:          usuario.email,
            usuario:        usuario.username,
            direccion:      '',
            fechaNacimiento: '',
            telefono:       '',
            password:       ''
        });
        this.modalUsuarioVisible = true;
    }

    guardarUsuario() {
        if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    const formValue = { ...this.form.value };
    if (formValue.fechaNacimiento) {
        const [year, month, day] = formValue.fechaNacimiento.split('-');
        formValue.fechaNacimiento = `${day}/${month}/${year}`;
    }

        if (this.modoEdicion && this.usuarioSeleccionado) {
            this.http.put<any>(`http://localhost:3000/api/usuarios/${this.usuarioSeleccionado.id}`, formValue)
            .subscribe({
                next: () => {
                    this.usuarios = this.usuarios.map(u =>
                        u.id === this.usuarioSeleccionado!.id
                            ? { ...u, ...formValue, username: formValue.usuario }
                            : u
                    );
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado.' });
                    this.modalUsuarioVisible = false;
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error?.data?.[0]?.message || 'Error inesperado.'
                    });
                }
            });
        } else {
            this.http.post<any>('http://localhost:3000/api/auth/register', formValue).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado.' });
                    this.modalUsuarioVisible = false;
                    this.cargarUsuarios();
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error?.data?.[0]?.message || 'Error inesperado.'
                    });
                }
            });
        }
    }

    abrirPermisos(usuario: UsuarioAdmin) {
        this.usuarioSeleccionado = usuario;
        this.permisosSeleccionados = [...usuario.permisos];
        this.modalPermisosVisible = true;
    }

    guardarPermisos() {
        if (!this.usuarioSeleccionado) return;

        this.http.put<any>(
            `http://localhost:3000/api/usuarios/${this.usuarioSeleccionado.id}/permisos`,
            { permisos: this.permisosSeleccionados }
        ).subscribe({
            next: () => {
                this.usuarios = this.usuarios.map(u =>
                    u.id === this.usuarioSeleccionado!.id
                        ? { ...u, permisos: this.permisosSeleccionados }
                        : u
                );
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Permisos actualizados.' });
                this.modalPermisosVisible = false;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar permisos.' });
            }
        });
    }

    confirmarCambioEstado(usuario: UsuarioAdmin) {
        const esActivo = usuario.activo;
        this.confirmationService.confirm({
            message: esActivo 
                ? `¿Dar de baja a "${usuario.nombreCompleto}"?`
                : `¿Reactivar a "${usuario.nombreCompleto}"?`,
            header: esActivo ? 'Confirmar Baja' : 'Confirmar Reactivación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: esActivo ? 'Sí, dar de baja' : 'Sí, reactivar',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: esActivo ? 'danger' : 'success' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                const url = esActivo
                    ? `http://localhost:3000/api/usuarios/${usuario.id}/baja`
                    : `http://localhost:3000/api/usuarios/${usuario.id}/activar`;

                this.http.patch(url, {}).subscribe({
                    next: () => {
                        this.usuarios = this.usuarios.map(u =>
                            u.id === usuario.id ? { ...u, activo: !esActivo } : u
                        );
                        this.messageService.add({
                            severity: esActivo ? 'warn' : 'success',
                            summary: esActivo ? 'Baja' : 'Reactivado',
                            detail: `Usuario "${usuario.nombreCompleto}" ${esActivo ? 'dado de baja' : 'reactivado'}.`
                        });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar el estado.' });
                    }
                });
            }
        });
    }
}