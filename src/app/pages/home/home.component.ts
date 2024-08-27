// home.componentt.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeLayoutComponent {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}
  authService = inject(AuthService);
  router = inject(Router);
  isDrawerOpen = false;
  isHovering: boolean = false
  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigateByUrl('login');
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
  
  exportTasks() {
    this.taskService.exportTasksToCSV();
  }
}
