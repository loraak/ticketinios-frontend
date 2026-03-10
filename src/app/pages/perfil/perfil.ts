import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService, PERMISOS } from '../../services/auth.service';

interface TicketResumen {
    id: number;
    titulo: string;
    estado: string;
    prioridad: string;
    grupo: string;
    fechaLimite: Date;
}

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        AvatarModule, CardModule, TagModule, DividerModule,
        ButtonModule, DialogModule, InputTextModule, FloatLabelModule,
        ToastModule, ConfirmDialogModule, TooltipModule,
        InputMaskModule, KeyFilterModule, TableModule,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './perfil.html',
    styleUrl: './perfil.css'
})
export class Perfil {
    protected authService = inject(AuthService);
    protected PERMISOS = PERMISOS;

    modalVisible = false;

    usuario = {
        nombreCompleto: 'César Zeppeli',
        usuario: 'Pou',
        email: 'cesar@email.com',
        direccion: 'Av. Estados Unidos',
        fechaNacimiento: '15/03/1800',
        telefono: '524681033370',
        activo: true
    };

    // Tickets asignados al usuario (en producción vendrían del backend)
    ticketsAsignados: TicketResumen[] = [
        { id: 1, titulo: 'Actualizar dependencias', estado: 'Pendiente',   prioridad: 'Media',  grupo: 'Joestar',   fechaLimite: new Date('2026-03-15') },
        { id: 2, titulo: 'Crear BD',                estado: 'En Progreso', prioridad: 'Alta',   grupo: 'Joestar',   fechaLimite: new Date('2026-03-20') },
        { id: 3, titulo: 'Diseñar logo',            estado: 'Hecho',       prioridad: 'Baja',   grupo: 'Stardust',  fechaLimite: new Date('2026-03-05') },
        { id: 4, titulo: 'Arreglar CORS',           estado: 'Bloqueado',   prioridad: 'Crítica',grupo: 'Diamond',   fechaLimite: new Date('2026-03-10') },
        { id: 5, titulo: 'Implementar JWT',         estado: 'En Progreso', prioridad: 'Alta',   grupo: 'Passione',  fechaLimite: new Date('2026-03-18') },
    ];

    get resumen() {
        return {
            total:      this.ticketsAsignados.length,
            pendiente:  this.ticketsAsignados.filter(t => t.estado === 'Pendiente').length,
            enProgreso: this.ticketsAsignados.filter(t => t.estado === 'En Progreso').length,
            bloqueado:  this.ticketsAsignados.filter(t => t.estado === 'Bloqueado').length,
            hecho:      this.ticketsAsignados.filter(t => t.estado === 'Hecho').length,
        };
    }

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.form = this.fb.group({
            nombreCompleto:  ['', Validators.required],
            usuario:         ['', Validators.required],
            email:           ['', [Validators.required, Validators.email]],
            direccion:       ['', Validators.required],
            fechaNacimiento: ['', Validators.required],
            telefono:        ['', Validators.required]
        });
    }

    get f() {
        return this.form.controls as { [key: string]: FormControl };
    }

    severidadEstado(estado: string): 'info' | 'warn' | 'success' | 'danger' | 'secondary' {
        const map: Record<string, 'info' | 'warn' | 'success' | 'danger' | 'secondary'> = {
            'Pendiente':   'info',
            'En Progreso': 'warn',
            'Hecho':       'success',
            'Bloqueado':   'danger',
        };
        return map[estado] ?? 'secondary';
    }

    severidadPrioridad(prioridad: string): 'success' | 'warn' | 'danger' {
        if (prioridad === 'Alta' || prioridad === 'Crítica') return 'danger';
        if (prioridad === 'Media') return 'warn';
        return 'success';
    }

    abrirEditar() {
        this.form.patchValue(this.usuario);
        this.modalVisible = true;
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.usuario = { ...this.usuario, ...this.form.value };
        this.modalVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado.' });
    }

    confirmarBaja() {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que deseas dar de baja tu perfil?',
            header: 'Confirmar Baja',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, dar de baja',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', text: true },
            accept: () => {
                this.usuario.activo = false;
                this.messageService.add({ severity: 'warn', summary: 'Baja', detail: 'Tu perfil ha sido dado de baja.' });
            }
        });
    }
}