import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DragDropModule } from 'primeng/dragdrop'; 
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { PermissionsService } from '../../services/permissions.service'; // Ajusta la ruta
import { HasPermissionDirective } from '../../directives/has-permission.directive'; // Ajusta la ruta

export interface Ticket { 
  id: number; 
  titulo: string; 
  estado: string; 
  asignado: string; 
  prioridad: string; 
  fechaCreacion: Date; 
  fechaLimite: Date; 
}

@Component({
  selector: 'app-group-detail',
  standalone: true, 
  imports: [
    CommonModule, ReactiveFormsModule, ButtonModule, TagModule, TableModule,
    DialogModule, InputTextModule, DragDropModule,
    FloatLabelModule, ConfirmDialogModule, ToastModule,
    HasPermissionDirective // <-- Importante
  ], 
  providers: [ConfirmationService, MessageService],
  templateUrl: './group-detail.html',
  styleUrl: './group-detail.css',
})
export class GroupDetail {
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  protected authService = inject(AuthService); 
  protected permissionsSvc = inject(PermissionsService); // <-- Inyectado
  
  ticketArrastrado: Ticket | null = null; 
  vistaActual: 'kanban' | 'tabla' = 'kanban'; 

  dragStart(ticket: Ticket) {
    this.ticketArrastrado = ticket;
  }

  dragEnd() {
    this.ticketArrastrado = null;
  }

  drop(estadoDestino: string) {
    if (this.ticketArrastrado && this.ticketArrastrado.estado !== estadoDestino) {
      this.ticketArrastrado.estado = estadoDestino;
      this.tickets = [...this.tickets];
    }
    this.ticketArrastrado = null;
  }

  tickets: Ticket[] = [
    { id: 1, titulo: 'Arreglar login', estado: 'Pendiente', asignado: 'César Usuario', prioridad: 'Alta', fechaCreacion: new Date('2026-03-01'), fechaLimite: new Date('2026-03-15') },
    { id: 2, titulo: 'Crear UI Kanban', estado: 'Pendiente', asignado: 'César Usuario', prioridad: 'Media', fechaCreacion: new Date('2026-03-05'), fechaLimite: new Date('2026-03-20') },
    { id: 3, titulo: 'Actualizar BD', estado: 'Bloqueado', asignado: 'Jonathan', prioridad: 'Crítica', fechaCreacion: new Date('2026-02-28'), fechaLimite: new Date('2026-03-10') },
  ];

  estados = ['Pendiente', 'En Progreso', 'Bloqueado', 'Hecho'];
  prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

  modoEdicion = false;
  modalVisible = false;
  ticketSeleccionado: Ticket | null = null;

  form: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    asignado: ['', Validators.required],
    estado: ['Pendiente', Validators.required],
    prioridad: ['Media', Validators.required],
    fechaLimite: [null, Validators.required]
  });

  getTickets(estado: string) {
    return this.tickets.filter(t => t.estado === estado);
  }

  getSeverity(prioridad: string): 'success' | 'warn' | 'danger' | 'info' {
    if (prioridad === 'Alta' || prioridad === 'Crítica') return 'danger';
    if (prioridad === 'Media') return 'warn';
    return 'success';
  }

  crearTicket() {
    this.modoEdicion = false;
    this.ticketSeleccionado = null;
    this.form.reset({ estado: 'Pendiente', prioridad: 'Media' });
    this.modalVisible = true;
  }

  editarTicket(ticket: Ticket) {
    this.modoEdicion = true;
    this.ticketSeleccionado = ticket;
    const fecha = new Date(ticket.fechaLimite);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    this.form.patchValue({
      ...ticket,
      fechaLimite: fechaFormateada
    });
    this.modalVisible = true;
  }

  eliminarTicket(ticket: Ticket) {
    this.confirmationService.confirm({
      message: `¿Seguro que deseas eliminar el ticket "${ticket.titulo}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => {
        this.tickets = this.tickets.filter(t => t.id !== ticket.id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Ticket borrado correctamente.' });
      }
    });
  }

  guardarTicket() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    if (this.modoEdicion && this.ticketSeleccionado) {
      const idx = this.tickets.findIndex(t => t.id === this.ticketSeleccionado!.id);
      this.tickets[idx] = { ...this.ticketSeleccionado, ...this.form.value };
      this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Ticket modificado correctamente.' });
    } else {
      const nuevo: Ticket = { id: Date.now(), ...this.form.value, fechaCreacion: new Date() };
      this.tickets = [...this.tickets, nuevo];
      this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Ticket creado correctamente.' });
    }
    
    this.tickets = [...this.tickets]; 
    this.modalVisible = false;
  }

  get misTickets() {
    const usuarioActual = (this.authService.usuario() as any)?.nombreCompleto;
    return this.tickets.filter(t => t.asignado === usuarioActual);
  }
}