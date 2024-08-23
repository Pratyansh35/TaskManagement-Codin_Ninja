import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
    authService = inject(AuthService)
    router = inject(Router)
    signOut(){
        this.authService.signOut().subscribe(response => {
            this.router.navigateByUrl('login')
    })
    }
}