import { Injectable } from '@angular/core';
import { Database, ref, set, get, update, remove } from '@angular/fire/database';
import { inject } from '@angular/core';
import { Task } from '../models/task.model'; 
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private db = inject(Database);
  private authService = inject(AuthService);

  constructor() {}

  private getUserTasksPath() {
    const user = this.authService.currentUser();
    if (!user) throw new Error('User is not authenticated');
    return `tasks/${user.email}`;
  }

  saveTask(task: Task) {
    const taskRef = ref(this.db, `${this.getUserTasksPath()}/${task.id}`);
    return set(taskRef, task);
  }

  getTask(taskId: string) {
    const taskRef = ref(this.db, `${this.getUserTasksPath()}/${taskId}`);
    return get(taskRef).then(snapshot => snapshot.val());
  }

  getAllTasks() {
    const tasksRef = ref(this.db, this.getUserTasksPath());
    return get(tasksRef).then(snapshot => snapshot.val());
  }

  deleteTask(taskId: string) {
    const taskRef = ref(this.db, `${this.getUserTasksPath()}/${taskId}`);
    return remove(taskRef);
  }
}
