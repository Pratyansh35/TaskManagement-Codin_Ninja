import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { ViewCardsComponent } from './task-cards/view-cards.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterOutlet,
    ViewCardsComponent
  ]
})
export class AddTaskComponent {
  isFormOpen = false; 
  taskForm: FormGroup;
  currentStep: number = 0;
  

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    const today = new Date();
    const defaultDueDate = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [defaultDueDate],
      priority: ['medium'],
      status: ['to-do']
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKeyPress(event: KeyboardEvent) {
    if (this.currentStep === 0 && this.taskForm.get('title')?.value === '') {
      alert('Title is required');
    } else if (this.currentStep < 4) { 
      event.preventDefault(); 
      this.nextStep();
    } else if (this.currentStep === 4) { 
      event.preventDefault(); 
      this.confirm();
    }
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
    this.isFormOpen = false;
    this.currentStep = 0;
    this.taskForm.reset();
  }

  confirm() {
    if (this.taskForm.valid) {
      const userData = this.taskService.getCurrentUser();
      if (userData) {
        const task: Task = {
          ...this.taskForm.value,
          id: new Date().getTime().toString(),
          createdDate: new Date().toISOString(),
          history: [],
          useremail: userData?.email || 'unknown user',
        };
  
        this.taskService.saveTask(task).then(() => {
          const currentTasks = this.taskService.getTasksSubject().getValue();
          this.taskService.updateTasks([...currentTasks, task]); 
          alert('Task added successfully');
          this.cancel(); 
        }).catch(error => {
          console.error('Error adding task:', error);
        });
      }
    }
  }
  
}
