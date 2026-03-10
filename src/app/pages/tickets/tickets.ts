import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService, PERMISOS } from '../../services/auth.service';
import { DragDropModule } from 'primeng/dragdrop';

export interface Comentario { 
    autor: string; 
    texto: string; 
    fecha: Date; 
}

export interface Historial { 
    accion: string; 
    fecha: Date; 
}

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
        ConfirmDialogModule, FloatLabelModule, SelectModule, 
        ReactiveFormsModule, DragDropModule, ConfirmDialogModule, ToastModule, 
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './tickets.html',
    styleUrl: './tickets.css'
})
export class Tickets {
    private fb = inject(FormBuilder); 
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService); 
 
    protected authService = inject(AuthService);
    protected PERMISOS = PERMISOS;

    ticketArrastrado: Ticket | null = null; 
    modoEdicion = false; 
    modalVisible = false; 
    ticketSeleccionado: Ticket | null = null; 

    estados = ['Pendiente', 'En Progreso', 'Bloqueado', 'Hecho']; 
    prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

      grupos: any[] = [
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

    ticketsTotales: Ticket[] = [
        { 
            id: 1, titulo: 'Actualizar dependencias', descripcion: 'Subir Angular a la v18', estado: 'Pendiente', 
            asignado: 'César Usuario', creador: 'César Admin', prioridad: 'Media', 
            fechaCreacion: new Date('2026-03-01'), fechaLimite: new Date('2026-03-15'), 
            comentarios: [], historial: [{accion: 'Creado', fecha: new Date('2026-03-01')}], grupo: 'Joestar' 
        },
        { 
            id: 2, titulo: 'Crear BD', descripcion: 'Tablas SQL para usuarios', estado: 'En Progreso', 
            asignado: 'Jonathan', creador: 'César Usuario', prioridad: 'Alta', 
            fechaCreacion: new Date('2026-03-02'), fechaLimite: new Date('2026-03-20'), 
            comentarios: [{autor: 'Jonathan', texto: 'Ya empecé con el script', fecha: new Date('2026-03-03')}], 
            historial: [{accion: 'Movido a En Progreso', fecha: new Date('2026-03-03')}], grupo: 'Joestar' 
        },
        { 
            id: 3, titulo: 'Diseñar logo', descripcion: 'Hacer variantes en SVG', estado: 'Hecho', 
            asignado: 'César Usuario', creador: 'César Usuario', prioridad: 'Baja', 
            fechaCreacion: new Date('2026-02-25'), fechaLimite: new Date('2026-03-05'), 
            comentarios: [], historial: [{accion: 'Finalizado', fecha: new Date('2026-03-04')}], grupo: 'Stardust' 
        },
        { 
            id: 4, titulo: 'Arreglar CORS', descripcion: 'El backend rechaza peticiones', estado: 'Bloqueado', 
            asignado: 'Juan Prueba', creador: 'César Usuario', prioridad: 'Crítica', 
            fechaCreacion: new Date('2026-03-08'), fechaLimite: new Date('2026-03-10'), 
            comentarios: [{autor: 'Juan Prueba', texto: 'Necesito acceso al servidor', fecha: new Date('2026-03-09')}], 
            historial: [{accion: 'Marcado como Bloqueado', fecha: new Date('2026-03-09')}], grupo: 'Diamond' 
        },
        { 
            id: 5, titulo: 'Implementar JWT', descripcion: 'Seguridad en endpoints', estado: 'En Progreso', 
            asignado: 'Giorno', creador: 'César Admin', prioridad: 'Alta', 
            fechaCreacion: new Date('2026-03-05'), fechaLimite: new Date('2026-03-18'), 
            comentarios: [], historial: [{accion: 'Asignado a Giorno', fecha: new Date('2026-03-06')}], grupo: 'Passione' 
        },
        { 
            id: 6, titulo: 'Validación de formularios', descripcion: 'Campos requeridos en el registro', estado: 'Pendiente', 
            asignado: 'Jolyne', creador: 'César Usuario', prioridad: 'Media', 
            fechaCreacion: new Date('2026-03-09'), fechaLimite: new Date('2026-03-22'), 
            comentarios: [], historial: [{accion: 'Creado', fecha: new Date('2026-03-09')}], grupo: 'Stone' 
        },
        { 
            id: 7, titulo: 'Optimizar imágenes', descripcion: 'Comprimir assets pesados', estado: 'Hecho', 
            asignado: 'Johnny', creador: 'César Admin', prioridad: 'Baja', 
            fechaCreacion: new Date('2026-02-10'), fechaLimite: new Date('2026-02-20'), 
            comentarios: [], historial: [{accion: 'Finalizado', fecha: new Date('2026-02-19')}], grupo: 'Steel Ball' 
        },
        { 
            id: 8, titulo: 'Traducir al inglés', descripcion: 'i18n para la landing page', estado: 'Pendiente', 
            asignado: 'Gappy', creador: 'César Admin', prioridad: 'Media', 
            fechaCreacion: new Date('2026-03-10'), fechaLimite: new Date('2026-03-30'), 
            comentarios: [], historial: [{accion: 'Creado', fecha: new Date('2026-03-10')}], grupo: 'Jojolion' 
        },
        { 
            id: 9, titulo: 'Configurar pasarela de pagos', descripcion: 'Stripe webhook', estado: 'Bloqueado', 
            asignado: 'Dio', creador: 'César Admin', prioridad: 'Crítica', 
            fechaCreacion: new Date('2026-03-01'), fechaLimite: new Date('2026-03-12'), 
            comentarios: [{autor: 'Dio', texto: 'Faltan las llaves de producción', fecha: new Date('2026-03-05')}], 
            historial: [{accion: 'Marcado como Bloqueado', fecha: new Date('2026-03-05')}], grupo: 'Brando' 
        },
        { 
            id: 10, titulo: 'Modo oscuro', descripcion: 'Colores de PrimeFlex', estado: 'En Progreso', 
            asignado: 'César Usuario', creador: 'César Admin', prioridad: 'Media', 
            fechaCreacion: new Date('2026-03-06'), fechaLimite: new Date('2026-03-16'), 
            comentarios: [], historial: [{accion: 'Movido a En Progreso', fecha: new Date('2026-03-08')}], grupo: 'Joestar' 
        },
        { 
            id: 11, titulo: 'Exportar PDF', descripcion: 'Reporte de ventas', estado: 'Pendiente', 
            asignado: 'Kira', creador: 'César Usuario', prioridad: 'Alta', 
            fechaCreacion: new Date('2026-03-09'), fechaLimite: new Date('2026-03-25'), 
            comentarios: [], historial: [{accion: 'Creado', fecha: new Date('2026-03-09')}], grupo: 'Morioh' 
        },
        { 
            id: 12, titulo: 'Testing E2E', descripcion: 'Pruebas con Cypress', estado: 'Pendiente', 
            asignado: 'Juan Prueba', creador: 'César Usuario', prioridad: 'Baja', 
            fechaCreacion: new Date('2026-03-10'), fechaLimite: new Date('2026-04-01'), 
            comentarios: [], historial: [{accion: 'Creado', fecha: new Date('2026-03-10')}], grupo: 'Stardust' 
        }
    ];

    form: FormGroup = this.fb.group({
        titulo: ['', Validators.required],
    descripcion: [''],
    asignado: ['', Validators.required],
    estado: ['Pendiente', Validators.required],
    prioridad: ['Alta', Validators.required],
    fechaLimite: [null, Validators.required] 
    })

    get ticketsVisibles () { 
        if (this.authService.tienePermiso(this.PERMISOS.TICKETS_ADMIN)) { 
            return this.ticketsTotales;
        }
        const nombreUsuario = this.authService.usuario()?.nombreCompleto; 
        return this.ticketsTotales.filter(t => t.creador === nombreUsuario || t.asignado === nombreUsuario); 
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
        this.modalVisible = true;
    }

    agregarComentario(inputEl: HTMLInputElement) {
        const texto = inputEl.value.trim();
        if (!texto || !this.ticketSeleccionado) return;
        this.ticketSeleccionado.comentarios.push({ autor: 'Hola', texto, fecha: new Date() });
        inputEl.value = '';
    }

    eliminarTicket(ticket: Ticket) {
        this.confirmationService.confirm({
        message: `¿Eliminar "${ticket.titulo}"?`,
        header: 'Confirmar', icon: 'pi pi-exclamation-triangle',
        acceptButtonProps: { severity: 'danger' }, rejectButtonProps: { severity: 'secondary', text: true },
        accept: () => {
            this.ticketsTotales = this.ticketsTotales.filter(t => t.id !== ticket.id);
        }
        });
    }

    crearTicket() {
        this.modoEdicion = false;
        this.ticketSeleccionado = null;
        this.form.reset({ estado: 'Pendiente', prioridad: 'Baja' });
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

        this.ticketsTotales[idx] = { ...t, ...values };
        } else {
        const nuevo: Ticket = { 
            id: Date.now(), ...values, creador: 'Hola',
            fechaCreacion: new Date(), comentarios: [], historial: [{accion: 'Creado', fecha: new Date()}], grupo: 'General'
        };
        this.ticketsTotales.push(nuevo);
        }
        
        this.modalVisible = false;
    }

}