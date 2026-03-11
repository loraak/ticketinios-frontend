import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { MessageService, ConfirmationService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { PermissionsService } from '../../services/permissions.service'; 
import { HasPermissionDirective } from '../../directives/has-permission.directive'; 

interface Group {
    id: number;
    nivel: number;
    autor: string;
    nombre: string;
    integrantes: number;
    tickets: number;
    descripcion: string;
    activo: boolean;
}

@Component({
    selector: 'app-groups',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, InputNumberModule, TextareaModule,
        TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, DividerModule,
        HasPermissionDirective // <-- Importar directiva
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './crud.html',
    styleUrl: './crud.css'
})
export class Groups {
    protected authService = inject(AuthService);
    protected permissionsSvc = inject(PermissionsService); 
    protected router = inject(Router); 

    grupos: Group[] = [
        { id: 1, nivel: 1, autor: 'Jonathan', nombre: 'Joestar', integrantes: 5, tickets: 5, descripcion: 'Grupo principal', activo: true },
        { id: 2, nivel: 2, autor: 'César Usuario', nombre: 'Joestar', integrantes: 3, tickets: 5, descripcion: 'Grupo secundario', activo: true },
        { id: 3, nivel: 1, autor: 'César Usuario', nombre: 'Stardust', integrantes: 8, tickets: 1, descripcion: 'Grupo especial', activo: false },
        { id: 4, nivel: 3, autor: 'César Usuario', nombre: 'Diamond', integrantes: 4, tickets: 2, descripcion: 'Grupo local', activo: true },
        { id: 5, nivel: 2, autor: 'Giorno', nombre: 'Passione', integrantes: 10, tickets: 3, descripcion: 'Mafia', activo: true },
        { id: 6, nivel: 1, autor: 'Jolyne', nombre: 'Stone', integrantes: 6, tickets: 4, descripcion: 'Prisión', activo: true },
        { id: 7, nivel: 4, autor: 'Johnny', nombre: 'Steel Ball', integrantes: 2, tickets: 1, descripcion: 'Carrera', activo: true },
        { id: 8, nivel: 3, autor: 'Gappy', nombre: 'Jojolion', integrantes: 5, tickets: 1, descripcion: 'Misterio', activo: true },
        { id: 9, nivel: 1, autor: 'Dio', nombre: 'Brando', integrantes: 15, tickets: 5, descripcion: 'Villanos', activo: false },
        { id: 10, nivel: 2, autor: 'Kira', nombre: 'Morioh', integrantes: 1, tickets: 2, descripcion: 'Tranquilidad', activo: true }
    ];

    ticketsMock = [
        { id: 101, titulo: 'Falla en login', estado: 'Pendiente', grupo: 'Joestar', asignado: 'César Usuario' },
        { id: 102, titulo: 'Actualizar BD', estado: 'En Progreso', grupo: 'Joestar', asignado: 'Jonathan' },
        { id: 103, titulo: 'Crear vistas', estado: 'Hecho', grupo: 'Stardust', asignado: 'César Usuario' },
        { id: 104, titulo: 'Error 500', estado: 'Bloqueado', grupo: 'Joestar', asignado: 'Admin' },
    ];

    getResumenGrupo(nombreGrupo: string) {
        const tickets = this.ticketsMock.filter(t => t.grupo === nombreGrupo);
        
        return {
            total: tickets.length,
            pendientes: tickets.filter(t => t.estado === 'Pendiente').length,
            enProgreso: tickets.filter(t => t.estado === 'En Progreso').length,
            bloqueados: tickets.filter(t => t.estado === 'Bloqueado').length,
            hechos: tickets.filter(t => t.estado === 'Hecho').length,
            recientes: tickets.slice(-3).reverse() 
        };
    }

    expandedRows: { [key: string]: boolean } = {};
    resumenes: { [key: number]: any } = {};

    toggleRow(grupo: Group) {
        if (this.expandedRows[grupo.id]) {
            delete this.expandedRows[grupo.id];
            delete this.resumenes[grupo.id];
        } 
        else {
            this.expandedRows[grupo.id] = true;
            this.resumenes[grupo.id] = this.getResumenGrupo(grupo.nombre);
        }
        this.expandedRows = { ...this.expandedRows };
    }

    get gruposVisibles() {
        if (this.permissionsSvc.hasPermission('groups:admin')) {
            return this.grupos;
        }
        
        const nombreUsuario = (this.authService.usuario() as any)?.nombreCompleto;
        return this.grupos.filter(g => g.autor === nombreUsuario);
    }

    modalVisible = false;
    modoEdicion = false;
    grupoSeleccionado: Group | null = null;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.form = this.fb.group({
            nivel:       [null, Validators.required],
            autor:       ['', Validators.required],
            nombre:      ['', Validators.required],
            integrantes: [null, Validators.required],
            tickets:     [null, Validators.required],
            descripcion: ['', Validators.required]
        });
    }

    abrirModalNuevo() {
        this.modoEdicion = false;
        this.form.reset();
        this.modalVisible = true;
    }

    abrirModalEditar(grupo: Group) {
        this.modoEdicion = true;
        this.grupoSeleccionado = grupo;
        this.form.patchValue(grupo);
        this.modalVisible = true;
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.modoEdicion && this.grupoSeleccionado) {
            const idx = this.grupos.findIndex(g => g.id === this.grupoSeleccionado!.id);
            this.grupos[idx] = { ...this.grupoSeleccionado, ...this.form.value };
            this.grupos = [...this.grupos];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Grupo actualizado.' });
        } else {
            this.grupos = [...this.grupos, { id: Date.now(), ...this.form.value, activo: true }];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Grupo creado.' });
        }
        this.modalVisible = false;
    }

    ingresarGrupo() { 
        this.router.navigate(['/app/groupDetails']); 
    }

    confirmarBaja(grupo: Group) {
        this.confirmationService.confirm({
            message: `¿Dar de baja al grupo "${grupo.nombre}"?`,
            header: 'Confirmar Baja',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, dar de baja',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                const idx = this.grupos.findIndex(g => g.id === grupo.id);
                this.grupos[idx] = { ...this.grupos[idx], activo: false };
                this.grupos = [...this.grupos];
                this.messageService.add({ severity: 'warn', summary: 'Baja', detail: `Grupo "${grupo.nombre}" dado de baja.` });
            }
        });
    }
}