import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
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
import { environment } from '../../../environments/environment';
export interface Comentario { autor: string; texto: string; fecha: Date; }
export interface Historial { accion: string; fecha: Date; usuario: string; }

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

export class GroupDetail implements OnInit, OnDestroy{
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
  miembros: { usuarioId: string, nombreCompleto: string }[] = [];
  estados:    { id: string, nombre: string }[] = [];
  prioridades: { id: string, nombre: string }[] = [];
  permisosGrupoCargados =  false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarGrupo(id);
      this.cargarTickets(id); 
      this.cargarMiembros(id); 
      this.cargarEstados();    
      this.cargarPrioridades();
      this.permissionsSvc.refreshPermissionsForGroup(id, () => {
            this.permisosGrupoCargados = true; 
            this.cdr.detectChanges();
        });
    }
  }

  ngOnDestroy(): void {
    this.permissionsSvc.clearGroupPermissions();
  }

  private cargarMiembros(grupoId: string): void {
    this.http.get<any>(`${environment.apiUrl}/api/grupos/${grupoId}/miembros`).subscribe({
        next: (res) => this.miembros = res.data,
        error: () => this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los miembros.'
        })
    });
  }

  private cargarEstados(): void {
      this.http.get<any>(`${environment.apiUrl}/api/tickets/estados`).subscribe({
          next: (res) => this.estados = res.data
      });
  }

  private cargarPrioridades(): void {
      this.http.get<any>(`${environment.apiUrl}/api/tickets/prioridades`).subscribe({
          next: (res) => this.prioridades = res.data
      });
}

  private cargarTickets(grupoId: string): void { 
    this.cargandoTickets = true;
    this.http.get<any>(`${environment.apiUrl}/api/tickets?grupoId=${grupoId}`).subscribe({
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
    this.http.get(`${environment.apiUrl}/api/grupos/${id}`).subscribe({
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

  esAsignado(ticket: Ticket): boolean {
    const usuarioActual = (this.authService.usuario() as any)?.id;
    return ticket.asignadoId === usuarioActual;
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

    if (!this.esCreador(this.ticketArrastrado) && !this.esAsignado (this.ticketArrastrado) ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sin permiso',
        detail: 'Solo el creador o persona asignada puede cambiar el estado del ticket.'
      });
      this.ticketArrastrado = null;
      return;
    }

    const ticket = this.ticketArrastrado;
    const estadoAnterior = ticket.estado;

    ticket.estado = estadoDestino;
    this.tickets = [...this.tickets];
    this.ticketArrastrado = null;

    this.http.patch(`${environment.apiUrl}/api/tickets/${ticket.id}`, {
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

  modoEdicion = false;
  modalVisible = false;
  ticketSeleccionado: Ticket | null = null;

  form: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: [''], 
    asignado: ['', Validators.required],
    estadoId:    ['', Validators.required],  
    prioridadId: ['', Validators.required],
    fechaFinal: [null, Validators.required]
  });

  getTickets(estado: string) {
    return this.tickets.filter(t => t.estado === estado);
  }

  getSeverity(prioridad: string): 'success' | 'warn' | 'danger' | 'info' {
    if (prioridad === 'Alta') return 'danger';
    if (prioridad === 'Media') return 'warn';
    return 'success';
  }

  crearTicket() {
      this.modoEdicion = false;
      this.ticketSeleccionado = null;
      this.form.reset();
      this.form.enable();
      this.modalVisible = true;
  }

  guardarTicket() {
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }
      if (this.modoEdicion && this.ticketSeleccionado) {
        this.http.put<any>(`${environment.apiUrl}/api/tickets/${this.ticketSeleccionado.id}`, {
            titulo:      this.form.value.titulo,
            descripcion: this.form.value.descripcion,
            asignadoId:  this.form.value.asignado,
            estadoId:    this.form.value.estadoId,
            prioridadId: this.form.value.prioridadId,
            fechaFinal:  this.form.value.fechaFinal
        }).subscribe({
            next: (res) => {
                const t = res.data[0];
                const miembro = this.miembros.find(m => m.usuarioId === t.asignadoId);
                this.tickets = this.tickets.map(ticket =>
                    ticket.id === t.id ? {
                        ...ticket,
                        titulo:      t.titulo,
                        descripcion: t.descripcion,
                        estado:      t.estado,
                        prioridad:   t.prioridad,
                        asignadoId:  t.asignadoId,
                        asignado:    miembro?.nombreCompleto ?? t.asignadoId,
                        fechaFinal:  t.fechaFinal,
                    } : ticket
                );
                this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Ticket actualizado correctamente.' });
                this.modalVisible = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error?.message || 'Error inesperado.'
                });
            }
        });
      } else {
          this.http.post<any>(`${environment.apiUrl}/api/tickets`, {
              grupoId:     this.grupo.id,
              titulo:      this.form.value.titulo,
              descripcion: this.form.value.descripcion,
              asignadoId:  this.form.value.asignado,
              estadoId:    this.form.value.estadoId,
              prioridadId: this.form.value.prioridadId,
              fechaFinal:  this.form.value.fechaFinal
          }).subscribe({
              next: (res) => {
                const t = res.data[0];
                
                const miembro = this.miembros.find(m => m.usuarioId === t.asignadoId);
                const usuarioActual = this.authService.usuario();

                const nuevo: Ticket = {
                    id:          t.id,
                    titulo:      t.titulo,
                    descripcion: t.descripcion,
                    estado:      t.estado,
                    prioridad:   t.prioridad,
                    autorId:     t.autorId,
                    autor:       usuarioActual?.nombreCompleto ?? t.autorId,
                    asignadoId:  t.asignadoId,
                    asignado:    miembro?.nombreCompleto ?? t.asignadoId, 
                    fechaFinal:  t.fechaFinal,
                    creadoEn:    new Date(t.creadoEn),
                    comentarios: [],
                    historial:   []
                };
                this.tickets = [...this.tickets, nuevo];
                this.modalVisible = false;
                this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Ticket creado correctamente.' });
}, 
              error: (err) => {
                  this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: err.error?.message || 'Error inesperado.'
                  });
              }
          });
      }
  }

  editarTicket(ticket: Ticket) {
    this.modoEdicion = true;
    this.ticketSeleccionado = ticket;

    const estadoActual    = this.estados.find(e => e.nombre === ticket.estado);
    const prioridadActual = this.prioridades.find(p => p.nombre === ticket.prioridad);

    this.form.patchValue({
        titulo:      ticket.titulo,
        descripcion: ticket.descripcion,
        asignado:    ticket.asignadoId,
        estadoId:    estadoActual?.id,
        prioridadId: prioridadActual?.id,
        fechaFinal:  ticket.fechaFinal ? new Date(ticket.fechaFinal).toISOString().split('T')[0] : null
    });

    if (this.esCreador(ticket)) {
        this.form.enable();
    } else {
        this.form.disable();
    }

    this.cargarComentarios(ticket.id);
    this.cargarHistorial(ticket.id);

    this.modalVisible = true;
  }

  private cargarComentarios(ticketId: string): void {
    this.http.get<any>(`${environment.apiUrl}/api/tickets/${ticketId}/comentarios`).subscribe({
        next: (res) => {
            if (this.ticketSeleccionado) {
                this.ticketSeleccionado.comentarios = res.data;
                this.cdr.detectChanges();
            }
        }
    });
}

private cargarHistorial(ticketId: string): void {
    this.http.get<any>(`${environment.apiUrl}/api/tickets/${ticketId}/historial`).subscribe({
        next: (res) => {
            if (this.ticketSeleccionado) {
                this.ticketSeleccionado.historial = res.data;
                this.cdr.detectChanges();
            }
        }
    });
}

agregarComentario(inputEl: HTMLInputElement) {
    const texto = inputEl.value.trim();
    if (!texto || !this.ticketSeleccionado) return;

    this.http.post<any>(`${environment.apiUrl}/api/tickets/${this.ticketSeleccionado.id}/comentarios`, { texto }).subscribe({
        next: (res) => {
            const nombreUsuario = this.authService.usuario()?.nombreCompleto ?? 'Usuario';
            this.ticketSeleccionado?.comentarios?.push({
                autor: nombreUsuario,
                texto,
                fecha: new Date()
            });
            inputEl.value = '';
            this.cdr.detectChanges();
        },
        error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el comentario.' });
        }
    });
}

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
            this.http.delete(`${environment.apiUrl}/api/tickets/${ticket.id}`).subscribe({
                next: () => {
                    this.tickets = this.tickets.filter(t => t.id !== ticket.id);
                    this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Ticket eliminado correctamente.' });
                    this.modalVisible = false;
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error?.message || 'Error inesperado.'
                    });
                }
            });
        }
    });
  }

  get misTickets() {
    const usuarioActual = (this.authService.usuario() as any)?.id;
    return this.tickets.filter(t => t.asignadoId === usuarioActual);
  }
}