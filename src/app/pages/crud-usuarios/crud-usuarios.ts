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
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { MessageService, ConfirmationService } from 'primeng/api';

import { PermissionsService } from '../../services/permissions.service'; 
import { HasPermissionDirective } from '../../directives/has-permission.directive'; 

export interface UsuarioCrud {
    id: string;
    nombreCompleto: string;
    email: string;
    password: string;
    grupos: number[];
    activo: boolean;
}

export interface GrupoOpcion {
    id: number;
    nombre: string;
}

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, PasswordModule, MultiSelectModule, DividerModule,
        HasPermissionDirective // <-- Importamos la directiva
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './crud-usuarios.html',
    styleUrl: './crud-usuarios.css'
})
export class Usuarios {
    protected permissionsSvc = inject(PermissionsService);

    grupos: GrupoOpcion[] = [
        { id: 1, nombre: 'Joestar'     },
        { id: 2, nombre: 'Stardust'    },
        { id: 3, nombre: 'Diamond'     },
        { id: 4, nombre: 'Passione'    },
        { id: 5, nombre: 'Stone Ocean' },
        { id: 6, nombre: 'Steel Ball'  },
        { id: 7, nombre: 'Jojolion'    },
    ];

    usuarios: UsuarioCrud[] = [
        { id: '1', nombreCompleto: 'César Admin',   email: 'admin@app.com',   password: '123', grupos: [1, 2], activo: true  },
        { id: '2', nombreCompleto: 'César Usuario', email: 'usuario@app.com', password: '123', grupos: [1, 3], activo: true  },
        { id: '3', nombreCompleto: 'Juan Prueba',   email: 'juan@app.com',    password: '123', grupos: [],     activo: false },
    ];

    usuariosPorGrupo(grupoId: number): UsuarioCrud[] {
        return this.usuarios.filter(u => u.grupos.includes(grupoId));
    }

    get usuariosSinGrupo(): UsuarioCrud[] {
        return this.usuarios.filter(u => u.grupos.length === 0);
    }

    modalUsuarioVisible = false;
    modoEdicion = false;
    usuarioSeleccionado: UsuarioCrud | null = null;
    formUsuario: FormGroup;

    modalGrupoVisible = false;
    formGrupo: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.formUsuario = this.fb.group({
            nombreCompleto: ['', Validators.required],
            email:          ['', [Validators.required, Validators.email]],
            password:       ['', Validators.required],
            grupos:         [[]],
        });

        this.formGrupo = this.fb.group({
            nombre: ['', Validators.required],
        });
    }

    abrirModalGrupo() {
        this.formGrupo.reset();
        this.modalGrupoVisible = true;
    }

    guardarGrupo() {
        if (this.formGrupo.invalid) {
            this.formGrupo.markAllAsTouched();
            return;
        }
        const nuevoGrupo: GrupoOpcion = {
            id: Date.now(),
            nombre: this.formGrupo.value.nombre
        };
        this.grupos = [...this.grupos, nuevoGrupo];
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Grupo "${nuevoGrupo.nombre}" creado.` });
        this.modalGrupoVisible = false;
    }

    confirmarEliminarGrupo(grupo: GrupoOpcion) {
        this.confirmationService.confirm({
            message: `¿Eliminar el grupo "${grupo.nombre}"? Los usuarios no serán eliminados.`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                // Desasignar grupo de usuarios
                this.usuarios = this.usuarios.map(u => ({
                    ...u,
                    grupos: u.grupos.filter(gid => gid !== grupo.id)
                }));
                this.grupos = this.grupos.filter(g => g.id !== grupo.id);
                this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: `Grupo "${grupo.nombre}" eliminado.` });
            }
        });
    }

    abrirModalNuevo() {
        this.modoEdicion = false;
        this.usuarioSeleccionado = null;
        this.formUsuario.reset({ grupos: [] });
        this.formUsuario.get('password')!.setValidators(Validators.required);
        this.formUsuario.get('password')!.updateValueAndValidity();
        this.modalUsuarioVisible = true;
    }

    abrirModalEditar(usuario: UsuarioCrud) {
        this.modoEdicion = true;
        this.usuarioSeleccionado = usuario;
        this.formUsuario.patchValue({ ...usuario, password: '' });
        this.formUsuario.get('password')!.clearValidators();
        this.formUsuario.get('password')!.updateValueAndValidity();
        this.modalUsuarioVisible = true;
    }

    guardarUsuario() {
        if (this.formUsuario.invalid) {
            this.formUsuario.markAllAsTouched();
            return;
        }

        if (this.modoEdicion && this.usuarioSeleccionado) {
            const valores = this.formUsuario.value;
            const idx = this.usuarios.findIndex(u => u.id === this.usuarioSeleccionado!.id);
            this.usuarios[idx] = {
                ...this.usuarioSeleccionado,
                ...valores,
                password: valores.password || this.usuarioSeleccionado.password
            };
            this.usuarios = [...this.usuarios];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado.' });
        } else {
            this.usuarios = [...this.usuarios, {
                id: crypto.randomUUID(),
                ...this.formUsuario.value,
                activo: true
            }];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado.' });
        }
        this.modalUsuarioVisible = false;
    }

    confirmarBaja(usuario: UsuarioCrud) {
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