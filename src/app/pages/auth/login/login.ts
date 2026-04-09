import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ToastModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService]
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email()    { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

onSubmit(): void {
  if (this.loginForm.invalid) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, corrija los errores.' });
    this.loginForm.markAllAsTouched();
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({
    next: () => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso.' });
      setTimeout(() => this.router.navigate(['/app/home']), 1000);
    },
    error: (err) => {
      const msg = err.status === 403
          ? 'Tu cuenta ha sido dada de baja.'
          : 'Correo o contraseña incorrectos.';

      this.messageService.add({
          severity: 'error',
          summary: 'Acceso denegado',
          detail: msg
      });
    }
  });
}
}