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
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService, PERMISOS } from '../../services/auth.service';

export interface UsuarioCrud {
    id: string;
    nombreCompleto: string;
    email: string;
    password: string;
    rol: 'admin' | 'usuario';
    activo: boolean;
}

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TableModule, CardModule, ButtonModule, DialogModule,
        InputTextModule, TagModule, ToastModule, ConfirmDialogModule,
        FloatLabelModule, SelectModule, PasswordModule,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './crud-usuarios.html',
    styleUrl: './crud-usuarios.css'
})
export class Usuarios {
    protected authService = inject(AuthService);
    protected PERMISOS = PERMISOS;

    usuarios: UsuarioCrud[] = [
        { id: '1', nombreCompleto: 'César Admin',   email: 'admin@app.com',   password: '123', rol: 'admin',   activo: true  },
        { id: '2', nombreCompleto: 'César Usuario', email: 'usuario@app.com', password: '123', rol: 'usuario', activo: true  },
    ];

    roles = [
        { label: 'Admin',   value: 'admin'   },
        { label: 'Usuario', value: 'usuario' },
    ];

    modalVisible = false;
    modoEdicion = false;
    usuarioSeleccionado: UsuarioCrud | null = null;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.form = this.fb.group({
            nombreCompleto: ['', Validators.required],
            email:          ['', [Validators.required, Validators.email]],
            password:       ['', Validators.required],
            rol:            ['usuario', Validators.required],
        });
    }

    abrirModalNuevo() {
        this.modoEdicion = false;
        this.usuarioSeleccionado = null;
        this.form.reset({ rol: 'usuario' });
        this.form.get('password')!.setValidators(Validators.required);
        this.form.get('password')!.updateValueAndValidity();
        this.modalVisible = true;
    }

    abrirModalEditar(usuario: UsuarioCrud) {
        this.modoEdicion = true;
        this.usuarioSeleccionado = usuario;
        this.form.patchValue({ ...usuario, password: '' });
        this.form.get('password')!.clearValidators();
        this.form.get('password')!.updateValueAndValidity();
        this.modalVisible = true;
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.modoEdicion && this.usuarioSeleccionado) {
            const valores = this.form.value;
            const idx = this.usuarios.findIndex(u => u.id === this.usuarioSeleccionado!.id);
            this.usuarios[idx] = {
                ...this.usuarioSeleccionado,
                ...valores,
                password: valores.password || this.usuarioSeleccionado.password
            };
            this.usuarios = [...this.usuarios];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado.' });
        } else {
            const nuevo: UsuarioCrud = {
                id: crypto.randomUUID(),
                ...this.form.value,
                activo: true
            };
            this.usuarios = [...this.usuarios, nuevo];
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado.' });
        }
        this.modalVisible = false;
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