import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AuthService, PERMISOS } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarModule, ButtonModule],
  templateUrl: './layout.html'
})
export class Layout {
  protected authService = inject(AuthService);
  protected PERMISOS = PERMISOS;

  constructor(private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}