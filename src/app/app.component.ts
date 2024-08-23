import { Component, inject , OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';
  authService = inject(AuthService)

  ngOnInit(): void {
   this.authService.user$.subscribe((user: UserCredential) => {
    if(user){
      this.authService.currentUser.set({
        uid: user.user.uid!,
        displayName: user.user.displayName!,
        email: user.user.email!,
        photoURL: user.user.photoURL!
      }) 
    }
  })
    
  }
}
