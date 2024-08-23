import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authservice = inject(AuthService)
  formBuilder = inject(FormBuilder)
  // login form with validation that is linked to the component template with formGroup directive
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  redirectregister(){
    window.location.href = "/register"
  }
  login(){
  this.authservice.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((response) => {
    alert('User logged in successfully')
  }, (error) => {
      alert(error.message)
    }
  )
  }
  githublogin(){
    this.authservice.ContinueWithGithub().subscribe((response) => {
      alert(response.user)
      console.log(response.user);
    }, (error) => {
      console.log(" "+ error.message );
      
    }
    )
  }
}