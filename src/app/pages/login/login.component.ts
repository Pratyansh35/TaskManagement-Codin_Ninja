import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
   
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  authservice = inject(AuthService);
  formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

 
  ngAfterViewInit() {
   
  }

  redirectregister() {
    window.location.href = "/register";
  }

  login() {
    this.authservice.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
      next: () => {
        alert('User logged in successfully');
        window.location.href = "/home";
      },
      error: (error) => {
        alert('Login error: ' + error.message);
      }
    });
  }

  githublogin() {
    this.authservice.ContinueWithGithub().subscribe({
      next: () => {
        window.location.href = "/home";
      },
      error: (error) => {
        alert('Github login error: ' + error.message);
      }
    });
  }
}
