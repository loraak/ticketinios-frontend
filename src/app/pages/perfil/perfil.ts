import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

import { AuthService } from '../../services/auth.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive'; 

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        AvatarModule, CardModule, TagModule, DividerModule,
        ButtonModule, DialogModule, InputTextModule, FloatLabelModule,
        ToastModule, ConfirmDialogModule, TooltipModule,
        InputMaskModule, KeyFilterModule, TableModule,
        HasPermissionDirective
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './perfil.html',
    styleUrl: './perfil.css'
})

export class Perfil {
    protected authService = inject(AuthService);
    loading = false; 
    modalVisible = false;

    usuario = computed(() => ({
        nombreCompleto: this.authService.usuario()?.nombreCompleto,
        usuario:        this.authService.usuario()?.username,
        email:          this.authService.usuario()?.email,
        direccion:      this.authService.usuario()?.direccion,
        fechaNacimiento:this.authService.usuario()?.fechaNacimiento,
        telefono:       this.authService.usuario()?.telefono,
        activo:         this.authService.usuario()?.activo
    }));

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient, 
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
        this.form.patchValue(this.usuario());
        this.modalVisible = true;
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const id = this.authService.usuario()?.id; 
        if (!id) return;

        this.loading = true;

        const formValue = { ...this.form.value };
        if (formValue.fechaNacimiento) {
            const [year, month, day] = formValue.fechaNacimiento.split('-');
            formValue.fechaNacimiento = `${day}/${month}/${year}`;
        }

        this.http.put(`http://localhost:3000/api/auth/update/${id}`, formValue).subscribe({
            next: () => {
                this.loading = false;
                this.modalVisible = false; 
                this.authService.actualizarUsuario(this.form.value);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Perfil Actualizado',
                    detail: 'Tus datos fueron actualizados correctamente.'
                });
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error al Actualizar',
                    detail: err.error?.data?.[0]?.message || 'Ocurrió un error inesperado.'
                });
            }
        });
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
                const id = this.authService.usuario()?.id;
                if (!id) return;

                this.http.patch(`http://localhost:3000/api/auth/baja/${id}`, {}).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Baja',
                            detail: 'Tu perfil ha sido dado de baja.'
                        });
                        setTimeout(() => this.authService.logout(), 1500); 
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error?.data?.[0]?.message || 'Ocurrió un error inesperado.'
                        });
                    }
                });
            }
        });
    }
}