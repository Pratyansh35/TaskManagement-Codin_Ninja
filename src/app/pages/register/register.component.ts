import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  signUp(){
    this.authService.register(
      this.registerForm.value.email!,
      this.registerForm.value.password!
    ).subscribe((response)  =>{
      alert('User registered successfully')
    }, (error) => {
      alert(error.message)
    }
    )
  }

}
