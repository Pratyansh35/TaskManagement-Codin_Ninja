import { Injectable } from '@angular/core';
import { Database, ref, set, get, remove } from '@angular/fire/database';
import { inject } from '@angular/core';
import { Task } from '../models/task.model'; 
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private db = inject(Database);
  private authService = inject(AuthService);
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  
  
  getTasksSubject() {
    return this.tasksSubject;
  }

  updateTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
  }

  constructor() {}

  getCurrentUser() {
    return this.authService.currentUser();
  }

  private getUserTasksPath() {  // saving and getting tasks by userId provided by firebase
    const user = this.authService.currentUser();
    if (!user) throw new Error('User is not authenticated');
    return `tasks/${user.uid}`;
  }

  saveTask(task: Task) {
    const taskRef = ref(this.db, `${this.getUserTasksPath()}/${task.id}`);
    return set(taskRef, task);
  }

  getTask(taskId: string) {
    const taskRef = ref(this.db, `${this.getUserTasksPath()}/${taskId}`);
    return get(taskRef).then(snapshot => snapshot.val());
  }
  
  getAllTasks(): Promise<Task[]> {
    const userTasksRef = this.getUserTasksPath();
    return get(ref(this.db, userTasksRef)).then(snapshot => {
      const tasksData = snapshot.val();
      const tasksArray: Task[] = [];
      if (tasksData) {
        for (const taskId in tasksData) {
          if (tasksData.hasOwnProperty(taskId)) {
            tasksArray.push(tasksData[taskId]);
          }
        }
      }
      return tasksArray;
    });
  }
  
  
  
  deleteTask(taskId: string) {
    const taskRef = ref(this.db, `${this.getUserTasksPath()}/${taskId}`);
    return remove(taskRef);
  }
}
