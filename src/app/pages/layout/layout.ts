import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive'; // Ajusta la ruta

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarModule, ButtonModule, HasPermissionDirective],
  templateUrl: './layout.html'
})
export class Layout {
  protected authService = inject(AuthService);

  constructor(private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}