import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { PermissionsService } from '../../services/permissions.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { OnInit } from '../../../../node_modules/@angular/core/types/core';
export interface Comentario { autor: string; texto: string; fecha: Date; }
export interface Historial { accion: string; fecha: Date; }

export interface Ticket { 
  id: string; 
  titulo: string; 
  descripcion?: string; 
  estado: string; 
  prioridad: string; 
  autorId: string;
  autor: string;
  asignado: string;
  asignadoId: string;
  fechaFinal: Date; 
  creadoEn: Date;
  comentarios?: Comentario[];
  historial?: Historial[];
}

@Component({
  selector: 'app-group-detail',
  standalone: true, 
  imports: [
    CommonModule, ReactiveFormsModule, ButtonModule, TagModule, TableModule,
    DialogModule, InputTextModule, DragDropModule,
    FloatLabelModule, ConfirmDialogModule, ToastModule,
    HasPermissionDirective, SkeletonModule
  ], 
  providers: [ConfirmationService, MessageService],
  templateUrl: './group-detail.html',
  styleUrl: './group-detail.css',
})

export class GroupDetail implements OnInit{
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  protected authService = inject(AuthService);
  protected permissionsSvc = inject(PermissionsService);
  grupo: any = null;
  ticketArrastrado: Ticket | null = null; 
  vistaActual: 'kanban' | 'tabla' = 'kanban'; 
  ticketSeleccinoado?: Ticket | null = null; 
  cargandoGrupo = true;
  tickets: Ticket[] = [];
  cargandoTickets = false; 

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarGrupo(id);
      this.cargarTickets(id); 
    }
  }

  private cargarTickets(grupoId: string): void { 
    this.cargandoTickets = true;
    this.http.get<any>(`http://localhost:3000/api/tickets?grupoId=${grupoId}`).subscribe({
        next: (res) => {
          this.tickets = res.data.map((t: any) => ({
            ...t,
            comentarios: [],
            historial: []
          }));
          this.cargandoTickets = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los tickets.'
          });
          this.cargandoTickets = false;
          this.cdr.detectChanges();
        }
      });
    }
      

  private cargarGrupo(id: string): void {
    this.cargandoGrupo = true;
    this.http.get(`http://localhost:3000/api/grupos/${id}`).subscribe({
      next: (res: any) => {
        this.grupo = res.data[0];
        this.cargandoGrupo = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargandoGrupo = false;
        this.cdr.detectChanges();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el grupo.' });
      }
    });
  }

  formatearFecha(fecha: string): Date | null {
    if (!fecha) return null;
    return new Date(fecha + 'Z');
  }

  esCreador(ticket: Ticket): boolean {
    const usuarioActual = (this.authService.usuario() as any)?.id;
    return ticket.autorId === usuarioActual;
  }

  dragStart(ticket: Ticket) {
    this.ticketArrastrado = ticket;
  }

  dragEnd() {
    this.ticketArrastrado = null;
  }

drop(estadoDestino: string) {
  if (!this.ticketArrastrado) return;
  if (this.ticketArrastrado.estado === estadoDestino) {
    this.ticketArrastrado = null;
    return;
  }

  if (!this.esCreador(this.ticketArrastrado)) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Sin permiso',
      detail: 'Solo el creador puede cambiar el estado del ticket.'
    });
    this.ticketArrastrado = null;
    return;
  }

  const ticket = this.ticketArrastrado;
  const estadoAnterior = ticket.estado;

  ticket.estado = estadoDestino;
  this.tickets = [...this.tickets];
  this.ticketArrastrado = null;

  this.http.patch(`http://localhost:3000/api/tickets/${ticket.id}`, {
    estado: estadoDestino
  }).subscribe({
    error: () => {
      ticket.estado = estadoAnterior;
      this.tickets = [...this.tickets];
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo actualizar el estado del ticket.'
      });
    }
  });
}

  estados = ['Revisión', 'Por hacer', 'Hecho', 'Cancelado'];
  prioridades = ['Baja', 'Media', 'Alta'];

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
    this.form.reset({ estado: 'Pendiente', prioridad: 'Media', creador: 'Giorno Giovanna' });

    this.form.enable(); 
    this.modalVisible = true;
  }

  /*
  editarTicket(ticket: Ticket) {
    this.modoEdicion = true;
    this.ticketSeleccionado = ticket;
    const fecha = new Date(ticket.fechaLimite);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    this.form.patchValue({
      ...ticket,
      fechaLimite: fechaFormateada
    });
    

    if (this.esCreador(ticket)) {
      this.form.enable(); 
    } else { 
      this.form.disable(); 
    }

    this.modalVisible = true;
  }
    */

  /*
    agregarComentario(inputEl: HTMLInputElement) {
        const texto = inputEl.value.trim();
        if (!texto || !this.ticketSeleccionado) return;
        const nombreUsuario = (this.authService.usuario() as any)?.nombreCompleto || 'Usuario';
        this.ticketSeleccionado?.comentarios.push({ autor: nombreUsuario, texto, fecha: new Date() });
        inputEl.value = '';
    }
        */


  eliminarTicket(ticket: Ticket) {
    if (!this.esCreador(ticket)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Solo el creador puede eliminar este ticket.' });
      return;
    }

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
        this.modalVisible = false; 
      }
    });
  }

  guardarTicket() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const usuarioActual = (this.authService.usuario() as any)?.nombreCompleto || 'Usuario';
    
    if (this.modoEdicion && this.ticketSeleccionado) {
      const idx = this.tickets.findIndex(t => t.id === this.ticketSeleccionado!.id);
      this.tickets[idx] = { ...this.ticketSeleccionado, ...this.form.value };
      this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Ticket modificado correctamente.' });
    } else {
      const nuevo: Ticket = { 
        id: Date.now(), 
        ...this.form.value, 
        creador: usuarioActual, 
        fechaCreacion: new Date(),
        comentarios: [],
        historial: [{ accion: 'Ticket creado', fecha: new Date() }]
      };
      this.tickets = [...this.tickets, nuevo];
      this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Ticket creado correctamente.' });
    }
    
    this.tickets = [...this.tickets]; 
    this.modalVisible = false;
  }

  get misTickets() {
    const usuarioActual = (this.authService.usuario() as any)?.id;
    return this.tickets.filter(t => t.asignadoId === usuarioActual);
  }
}