import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DragDropModule } from 'primeng/dragdrop';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService, PERMISOS } from '../../services/auth.service'; // Ajusta la ruta

export interface Comentario { autor: string; texto: string; fecha: Date; }
export interface Historial { accion: string; fecha: Date; }
export interface Ticket {
    id: number; 
    titulo: string;
    descripcion: string;
    estado: string; 
    asignado: string; 
    creador: string; 
    prioridad: string; 
    fechaCreacion: Date; 
    fechaLimite: Date; 
    comentarios: Comentario[]; 
    historial: Historial[]; 
    grupo: string; 
}

@Component({
    selector: 'app-tickets',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, TagModule, ToastModule,
        ConfirmDialogModule, FloatLabelModule, DragDropModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './tickets.html',
    styleUrl: './tickets.css'
})
export class Tickets implements OnInit {
    private fb = inject(FormBuilder); 
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService); 
    protected authService = inject(AuthService);
    protected PERMISOS = PERMISOS;

    vistaActual: 'kanban' | 'tabla' = 'kanban';
    ticketArrastrado: Ticket | null = null; 
    modoEdicion = false; 
    modalVisible = false; 
    ticketSeleccionado: Ticket | null = null; 

    estados = ['Pendiente', 'En Progreso', 'Bloqueado', 'Hecho']; 
    prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];
    usuarios = ['César Admin', 'César Usuario', 'Juan Prueba', 'Jonathan', 'Giorno', 'Jolyne', 'Johnny', 'Gappy', 'Dio', 'Kira'];

    ticketsTotales: Ticket[] = [
        { id: 1, titulo: 'Actualizar dependencias', descripcion: 'Subir Angular a la v18', estado: 'Pendiente', asignado: 'César Usuario', creador: 'César Admin', prioridad: 'Media', fechaCreacion: new Date('2026-03-01'), fechaLimite: new Date('2026-03-15'), comentarios: [], historial: [{accion: 'Creado', fecha: new Date('2026-03-01')}], grupo: 'Joestar' },
        { id: 2, titulo: 'Crear BD', descripcion: 'Tablas SQL para usuarios', estado: 'En Progreso', asignado: 'Jonathan', creador: 'César Admin', prioridad: 'Alta', fechaCreacion: new Date('2026-03-02'), fechaLimite: new Date('2026-03-20'), comentarios: [{autor: 'Jonathan', texto: 'Ya empecé con el script', fecha: new Date('2026-03-03')}], historial: [{accion: 'Movido a En Progreso', fecha: new Date('2026-03-03')}], grupo: 'Joestar' },
        { id: 3, titulo: 'Diseñar logo', descripcion: 'Hacer variantes en SVG', estado: 'Hecho', asignado: 'César Usuario', creador: 'César Usuario', prioridad: 'Baja', fechaCreacion: new Date('2026-02-25'), fechaLimite: new Date('2026-03-05'), comentarios: [], historial: [{accion: 'Finalizado', fecha: new Date('2026-03-04')}], grupo: 'Stardust' },
        { id: 4, titulo: 'Arreglar CORS', descripcion: 'El backend rechaza peticiones', estado: 'Bloqueado', asignado: 'Juan Prueba', creador: 'César Usuario', prioridad: 'Crítica', fechaCreacion: new Date('2026-03-08'), fechaLimite: new Date('2026-03-10'), comentarios: [{autor: 'Juan Prueba', texto: 'Necesito acceso al servidor', fecha: new Date('2026-03-09')}], historial: [{accion: 'Marcado como Bloqueado', fecha: new Date('2026-03-09')}], grupo: 'Diamond' },
        { id: 5, titulo: 'Implementar JWT', descripcion: 'Seguridad en endpoints', estado: 'En Progreso', asignado: 'Giorno', creador: 'César Admin', prioridad: 'Alta', fechaCreacion: new Date('2026-03-05'), fechaLimite: new Date('2026-03-18'), comentarios: [], historial: [{accion: 'Asignado a Giorno', fecha: new Date('2026-03-06')}], grupo: 'Passione' }
    ];

    form: FormGroup = this.fb.group({
        titulo: ['', Validators.required],
        descripcion: [''],
        asignado: ['', Validators.required],
        estado: ['Pendiente', Validators.required],
        prioridad: ['Alta', Validators.required],
        fechaLimite: [null, Validators.required] 
    });

    ngOnInit() {}

    filtroActivo: 'todos' | 'mis-tickets' | 'sin-asignar' | 'alta-prioridad' = 'todos';

    get ticketsVisibles() {
        const nombreUsuario = this.authService.usuario()?.nombreCompleto;
        const esAdmin = this.authService.tienePermiso(this.PERMISOS.TICKETS_ADMIN);

        let base = esAdmin
            ? this.ticketsTotales
            : this.ticketsTotales.filter(t => t.creador === nombreUsuario || t.asignado === nombreUsuario);

        switch (this.filtroActivo) {
            case 'mis-tickets':
                return base.filter(t => t.asignado === nombreUsuario || t.creador === nombreUsuario);
            case 'sin-asignar':
                return base.filter(t => !t.asignado || t.asignado.trim() === '');
            case 'alta-prioridad':
                return base.filter(t => t.prioridad === 'Alta' || t.prioridad === 'Crítica');
            default:
                return base;
        }
    }

    getSeverity(prioridad: string): 'success' | 'warn' | 'danger' | 'info' {
        if (prioridad === 'Alta' || prioridad === 'Crítica') return 'danger';
        if (prioridad === 'Media') return 'warn';
        return 'success';
    }

    getTickets(estado: string) { 
        return this.ticketsVisibles.filter(t => t.estado === estado); 
    }

    dragStart(ticket: Ticket) { this.ticketArrastrado = ticket; }
    dragEnd() { this.ticketArrastrado = null; }
  
    drop(estadoDestino: string) {
        if (this.ticketArrastrado && this.ticketArrastrado.estado !== estadoDestino) {
            this.ticketArrastrado.historial.push({ accion: `Movido a ${estadoDestino}`, fecha: new Date() });
            this.ticketArrastrado.estado = estadoDestino;
            this.ticketsTotales = [...this.ticketsTotales];
        } else {
            this.messageService.add({ severity: 'error', summary: 'Denegado', detail: 'Sin permisos.' });
        }
        this.ticketArrastrado = null;
    }

    editarTicket(ticket: Ticket) {
        this.modoEdicion = true;
        this.ticketSeleccionado = ticket;
        const fecha = new Date(ticket.fechaLimite).toISOString().split('T')[0];
        this.form.patchValue({ ...ticket, fechaLimite: fecha });

        const nombreUsuario = this.authService.usuario()?.nombreCompleto;
        const tienePermisoAdmin = this.authService.tienePermiso(this.PERMISOS.TICKETS_ADMIN);

        if (tienePermisoAdmin || ticket.creador === nombreUsuario) {
            this.form.enable();
        } else if (ticket.asignado === nombreUsuario) {
            this.form.disable();
            this.form.get('estado')?.enable();
        } else {
            this.form.disable();
        }
        this.modalVisible = true;
    }

    agregarComentario(inputEl: HTMLInputElement) {
        const texto = inputEl.value.trim();
        if (!texto || !this.ticketSeleccionado) return;
        const nombreUsuario = this.authService.usuario()?.nombreCompleto || 'Usuario';
        this.ticketSeleccionado.comentarios.push({ autor: nombreUsuario, texto, fecha: new Date() });
        inputEl.value = '';
    }

    eliminarTicket(ticket: Ticket) {
        const nombreUsuario = this.authService.usuario()?.nombreCompleto;
        const esAdmin = this.authService.tienePermiso(this.PERMISOS.TICKETS_ADMIN);

        if (esAdmin || ticket.creador === nombreUsuario) {
            this.confirmationService.confirm({
                message: `¿Eliminar "${ticket.titulo}"?`,
                header: 'Confirmar', icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sí, eliminar', rejectLabel: 'Cancelar',
                acceptButtonProps: { severity: 'danger' }, rejectButtonProps: { severity: 'secondary', text: true },
                accept: () => {
                    this.ticketsTotales = this.ticketsTotales.filter(t => t.id !== ticket.id);
                }
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Acceso Denegado', detail: 'El ticket no es de tu pertenencia.' });
        }
    }

    crearTicket() {
        this.modoEdicion = false;
        this.ticketSeleccionado = null;
        this.form.reset({ estado: 'Pendiente', prioridad: 'Baja' });
        this.form.enable();
        this.modalVisible = true;
    }

    guardarTicket() {
        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        const values = this.form.getRawValue();

        if (this.modoEdicion && this.ticketSeleccionado) {
            const idx = this.ticketsTotales.findIndex(t => t.id === this.ticketSeleccionado!.id);
            const t = this.ticketsTotales[idx];
            
            if (t.estado !== values.estado) t.historial.push({ accion: `Estado: ${values.estado}`, fecha: new Date() });
            if (t.prioridad !== values.prioridad) t.historial.push({ accion: `Prioridad: ${values.prioridad}`, fecha: new Date() });
            if (t.asignado !== values.asignado) t.historial.push({ accion: `Asignado a: ${values.asignado}`, fecha: new Date() });

            this.ticketsTotales[idx] = { ...t, ...values, fechaLimite: new Date(values.fechaLimite) };
        } else {
            const nombreUsuario = this.authService.usuario()?.nombreCompleto || 'Usuario';
            const nuevo: Ticket = { 
                id: Date.now(), ...values, creador: nombreUsuario,
                fechaCreacion: new Date(), fechaLimite: new Date(values.fechaLimite), comentarios: [], historial: [{accion: 'Creado', fecha: new Date()}], grupo: 'General'
            };
            this.ticketsTotales.push(nuevo);
        }
        
        this.ticketsTotales = [...this.ticketsTotales];
        this.modalVisible = false;
    }
}