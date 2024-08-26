import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service'; // Update the path as necessary
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-history',
  standalone: true,
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css'],
  imports: [CommonModule]
})
export class TaskHistoryComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().then(tasks => {
      this.tasks = tasks;
    }).catch(error => {
      console.error('Failed to fetch tasks:', error);
    });
  }

  getTaskHistory(task: Task) {
    return task.history || [];
  }
}
