import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';
import { Database, ref, onValue } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  title = 'task-manager';
  authService = inject(AuthService);

  ngOnInit(): void {
   
    this.authService.user$.subscribe((user: User | null) => {
      if (user) {
        this.authService.currentUser.set({
          uid: user.uid,
          displayName: user.displayName || 'Anonymous', 
          email: user.email || 'No email provided', 
          photoURL: user.photoURL || 'default-avatar-url'
        });
      } else {
        this.authService.currentUser.set(null); 
      }
    });
  }
}
