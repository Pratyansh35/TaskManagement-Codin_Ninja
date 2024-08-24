import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]  
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      priority: ['medium'],
      status: ['to-do']
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
        id: new Date().getTime().toString(), // Get a unique ID
        createdDate: new Date().toISOString(), // will be used to sort tasks
        history: []
      };
  
      this.taskService.saveTask(task).then(() => {
        console.log('Task added successfully');
        this.taskForm.reset();
      }).catch(error => {
        console.error('Error adding task:', error);
      });
    } else {
      console.error('Form is not valid');
    }
  }
  
}
