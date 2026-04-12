import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputMaskModule } from 'primeng/inputmask';
import {FloatLabelModule} from 'primeng/floatlabel';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasMinLength = value.length >= 10;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return hasMinLength && hasSpecialChar ? null : { passwordStrength: true };
  };
}

export function passwordMatchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) return null;

    if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

export function adultAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = control.value;
    if (!birthDate || birthDate.includes('_')) return null;

    const [day, month, year] = birthDate.split('/').map(Number);
    const birth = new Date(year, month - 1, day);

    if (isNaN(birth.getTime())) return { notAdult: true };

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18 ? null : { notAdult: true };
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule, 
    ButtonModule,
    ToastModule,
    KeyFilterModule,
    InputMaskModule,
    RouterModule,
  ],
  providers: [MessageService]
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        usuario:         ['', Validators.required],
        nombreCompleto:  ['', Validators.required],
        email:           ['', [Validators.required, Validators.email]],
        password:        ['', [Validators.required, passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required],
        direccion:       ['', Validators.required],
        fechaNacimiento: ['', [Validators.required, adultAgeValidator()]],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.loading) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, corrija los errores en el formulario.'
      });
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { confirmPassword, ...payload } = this.registerForm.getRawValue();

    this.http.post(`${environment.apiUrl}/api/auth/register`, payload).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Registro Exitoso',
          detail: 'Usuario registrado correctamente. Serás redirigido al login.'
        });
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el Registro',
          detail: err.error?.data?.[0]?.message || 'Ocurrió un error inesperado.'
        });
      }
    });
  }
}