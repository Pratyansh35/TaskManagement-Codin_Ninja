import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-dialog',
    templateUrl: './task-dialog.component.html',
    styleUrls: ['./task-dialog.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatSelectModule,
    ]
  })
export class TaskDialogComponent {
  taskForm: FormGroup;
  currentStep: number = 0;
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKeyPress(event: KeyboardEvent) {
    if(this.currentStep === 0 && this.taskForm.get('title')?.value === '') {
        alert('Title is required');
    }
    else if (this.currentStep < 4) { 
        event.preventDefault(); 
        this.nextStep();
      }else if (this.currentStep === 4) { 
      event.preventDefault(); 
      this.confirm();
    }
  }
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TaskDialogComponent>) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      priority: ['medium'],
      status: ['to-do']
    });
  }

  nextStep() {
    if (this.currentStep === 0 && this.taskForm.get('title')?.invalid) {
      return;
    }
    this.currentStep++;
  }

  skipStep() {
    this.currentStep++;
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
