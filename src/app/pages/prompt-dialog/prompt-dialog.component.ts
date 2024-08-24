import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SubmitEvent {
  email: string;
  password: string;
}

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PromptDialogComponent {
  isVisible = false;
  email = '';
  password = '';

  @Output() submitEvent = new EventEmitter<SubmitEvent>();

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  submit() {
    // Emit the email and password
    this.submitEvent.emit({ email: this.email, password: this.password });
    this.hide();
  }
}