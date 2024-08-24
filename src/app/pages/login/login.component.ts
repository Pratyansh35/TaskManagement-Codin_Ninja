import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PromptDialogComponent, SubmitEvent } from '../prompt-dialog/prompt-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PromptDialogComponent
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

  @ViewChild(PromptDialogComponent) promptDialog!: PromptDialogComponent;

  ngAfterViewInit() {
    if (this.promptDialog) {
      this.promptDialog.submitEvent.subscribe({
        next: ({ email, password }: SubmitEvent) => {
          this.authservice.linkEmailPasswordWithGithub(email, password).subscribe({
            next: () => {
              alert('Accounts linked successfully!');
              window.location.href = "/home";
            },
            error: (linkError) => {
              console.error('Error linking accounts:', linkError.message);
            }
          });
        }
      });
    }
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
        if (error.message.includes('auth/account-exists-with-different-credential')) {
          alert('An account already exists with the same email address but different sign-in credentials. Would you like to link the accounts?');
          if (this.promptDialog) {
            this.promptDialog.show(); // Show the custom dialog
          }
        } else {
          console.error('GitHub login error:', error.message);
        }
      }
    });
  }
}
