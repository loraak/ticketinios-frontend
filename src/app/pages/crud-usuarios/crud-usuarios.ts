import { Component, inject } from '@angular/core';
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
        TooltipModule, HasPermissionDirective 
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './crud-usuarios.html',
    styleUrl: './crud-usuarios.css'
})
export class Usuarios {
    protected permissionsSvc = inject(PermissionsService);

    grupos: GrupoOpcion[] = [
        { id: 1, nombre: 'Phantom Blood' },
        { id: 2, nombre: 'Golden Experience' },
        { id: 3, nombre: 'El Padrino' },
        { id: 4, nombre: 'Réquiem' },
        { id: 5, nombre: 'Star Dust' },
        { id: 6, nombre: 'Stone Ocean' }
    ];

    usuarios: UsuarioCrud[] = [
        { id: '1', nombreCompleto: 'Jonathan Joestar',   email: 'jonathan@gmail.com',   password: '123', grupos: [1], activo: true  },
        { id: '2', nombreCompleto: 'Giorno Giovanna', email: 'giorno@app.com', password: '123', grupos: [2, 3, 4], activo: true  },
        { id: '3', nombreCompleto: 'Dio Brando',   email: 'dio@gmail.com',    password: '123', grupos: [1],     activo: false },
        { id: '4', nombreCompleto: 'Mista',   email: 'mista@gmail.com',    password: '123', grupos: [2, 3 ,4],     activo: true},
        { id: '5', nombreCompleto: 'Narancia',   email: 'narancia@gmail.com',    password: '123', grupos: [2],     activo: false },
        { id: '6', nombreCompleto: 'Fugo',   email: 'fugo@gmail.com',    password: '123', grupos: [2],     activo: true },
        { id: '7', nombreCompleto: 'Abbacchio',   email: 'gabacho@gmail.com',    password: '123', grupos: [1],     activo: false },
        { id: '8', nombreCompleto: 'Trisha',   email: 'trisha@gmail.com',    password: '123', grupos: [2, 4],     activo: true },
        { id: '9', nombreCompleto: 'Bruno Bucciarati',   email: 'bruno@gmail.com',    password: '123', grupos: [2, 4],     activo: false },
        { id: '10', nombreCompleto: 'Kakyoin',   email: 'kakyoin@gmail.com',    password: '123', grupos: [5],     activo: false },
        { id: '11', nombreCompleto: 'Polnareff',   email: 'polnareff@gmail.com',    password: '123', grupos: [5],     activo: true },
        { id: '12', nombreCompleto: 'Avdol',   email: 'avdol@gmail.com',    password: '123', grupos: [5],     activo: false },
        { id: '13', nombreCompleto: 'Jotaro Kujo',   email: 'jotaro@gmail.com',    password: '123', grupos: [5],     activo: true },
        { id: '14', nombreCompleto: 'Joseph Joestar',   email: 'joseph@gmail.com',    password: '123', grupos: [5],     activo: true },
        { id: '15', nombreCompleto: 'Jolyne Joestar',   email: 'jolyne@gmail.com',    password: '123', grupos: [6],     activo: true },
        { id: '16', nombreCompleto: 'Weather',   email: 'weather@gmail.com',    password: '123', grupos: [6],     activo: false },
        { id: '17', nombreCompleto: 'Anastasia',   email: 'anastasia@gmail.com',    password: '123', grupos: [6],     activo: true },
        { id: '18', nombreCompleto: 'F.F.',   email: 'ff@gmail.com',    password: '123', grupos: [6],     activo: false },
        { id: '19', nombreCompleto: 'Ermes',   email: 'ermes@gmail.com',    password: '123', grupos: [6],     activo: true },
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
    grupoSeleccionado: GrupoOpcion | null = null;

    modalGrupoVisible = false;
    formGrupo: FormGroup;
    modoEdicionGrupo = false; 

    modalAnadirUsuariosVisible = false;
    grupoDestino: GrupoOpcion | null = null;
    usuariosDisponibles: UsuarioCrud[] = [];
    usuariosSeleccionados: string[] = [];

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

    abrirModalAnadirUsuarios(grupo: GrupoOpcion) {
        this.grupoDestino = grupo;
        this.usuariosDisponibles = this.usuarios.filter(u => !u.grupos.includes(grupo.id));
        this.usuariosSeleccionados = [];
        this.modalAnadirUsuariosVisible = true;
    }

    guardarUsuariosEnGrupo() {
        if (!this.grupoDestino || !this.usuariosSeleccionados.length) return;

        this.usuarios = this.usuarios.map(u => {
            if (this.usuariosSeleccionados.includes(u.id)) {
                return { ...u, grupos: [...u.grupos, this.grupoDestino!.id] };
            }
            return u;
        });

        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuarios añadidos correctamente.' });
        this.modalAnadirUsuariosVisible = false;
    }

    abrirModalGrupo() {
        this.modoEdicionGrupo = false;
        this.grupoSeleccionado = null;
        this.formGrupo.reset();
        this.modalGrupoVisible = true;
    }

    abrirModalEditarGrupo(grupo: GrupoOpcion) {
        this.modoEdicionGrupo = true;
        this.grupoSeleccionado = grupo;
        this.formGrupo.patchValue({ nombre: grupo.nombre });
        this.modalGrupoVisible = true;
    }

    guardarGrupo() {
        if (this.formGrupo.invalid) {
            this.formGrupo.markAllAsTouched();
            return;
        }

        if (this.modoEdicionGrupo && this.grupoSeleccionado) {
            const idx = this.grupos.findIndex(g => g.id === this.grupoSeleccionado!.id);
            this.grupos[idx] = { ...this.grupoSeleccionado, nombre: this.formGrupo.value.nombre };
            this.grupos = [...this.grupos];
            this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Grupo modificado correctamente.' });
        } else {
            const nuevoGrupo: GrupoOpcion = {
                id: Date.now(),
                nombre: this.formGrupo.value.nombre
            };
            this.grupos = [...this.grupos, nuevoGrupo];
            this.messageService.add({ severity: 'success', summary: 'Creado', detail: `Grupo "${nuevoGrupo.nombre}" creado.` });
        }
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