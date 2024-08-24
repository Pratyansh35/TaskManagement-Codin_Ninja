// home.componentt.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeLayoutComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isDrawerOpen = false;

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigateByUrl('login');
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
