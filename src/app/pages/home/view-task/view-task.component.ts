import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ViewTasksComponent implements OnInit {
  tasks: Task[] = [];
  editTaskForm: FormGroup | null = null;
  editingTaskId: string | null = null;

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().then((data) => {
      this.tasks = Object.values(data || {}); // Convert the object to an array
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    });
  }

  startEditing(task: Task) {
    this.editingTaskId = task.id || null;
    this.editTaskForm = this.fb.group({
      title: new FormControl(task.title, Validators.required),
      description: new FormControl(task.description),
      dueDate: new FormControl(task.dueDate),
      priority: new FormControl(task.priority),
      status: new FormControl(task.status)
    });
  }

  getFormControl(name: string): FormControl {
    return this.editTaskForm?.get(name) as FormControl;
  }

  saveTask(taskId: string) {
    if (this.editTaskForm?.valid) {
      const updatedTask: Task = {
        ...this.editTaskForm.value,
        id: taskId,
        history: []  
      };

      this.taskService.saveTask(updatedTask).then(() => {
        console.log('Task updated successfully');
        this.editingTaskId = null;
        this.editTaskForm = null;
        this.loadTasks();  // Refresh the task list
      }).catch(error => {
        console.error('Error updating task:', error);
      });
    } else {
      console.error('Form is not valid');
    }
  }

  cancelEdit() {
    this.editingTaskId = null;
    this.editTaskForm = null;
  }
}
