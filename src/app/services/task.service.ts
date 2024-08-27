import { Injectable } from '@angular/core';
import { Database, ref, set, get, remove } from '@angular/fire/database';
import { inject } from '@angular/core';
import { Task } from '../models/task.model'; 
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { saveAs } from 'file-saver'; 

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
  
    // current task data to compare with the updated data
    return this.getTask(task.id).then((currentTask: Task | null) => {
      if (currentTask) {
        const historyEntry = {
          timestamp: new Date().toISOString(),
          changes: this.detectChanges(currentTask, task),
        };
  
        // Add the history entry to the history array
        if (!currentTask.history) {
          currentTask.history = [];
        }
        currentTask.history.push(historyEntry);
  
        // Update the task with the new data and history
        return set(taskRef, { ...task, history: currentTask.history });
      } else {
        // If the task is new, just save it with an empty history
        return set(taskRef, { ...task, history: [] });
      }
    });
  }
  
  private detectChanges(oldTask: Task, newTask: Task): string[] {
    const changes: string[] = [];
  
    if (oldTask.title !== newTask.title) {
      changes.push(`Title changed from "${oldTask.title}" to "${newTask.title}"`);
    }
    if (oldTask.description !== newTask.description) {
      changes.push(`Description changed`);
    }
    if (oldTask.dueDate !== newTask.dueDate) {
      changes.push(`Due Date changed from "${oldTask.dueDate}" to "${newTask.dueDate}"`);
    }
    if (oldTask.priority !== newTask.priority) {
      changes.push(`Priority changed from "${oldTask.priority}" to "${newTask.priority}"`);
    }
    if (oldTask.status !== newTask.status) {
      changes.push(`Status changed from "${oldTask.status}" to "${newTask.status}"`);
    }
  
    return changes;
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

  exportTasksToCSV(): void {
    this.getAllTasks().then((tasks) => {
      const csvData = this.convertToCSV(tasks);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const fileName = 'tasks.csv';
      saveAs(blob, fileName);
    }).catch(error => {
      console.error('Error exporting tasks to CSV:', error);
    });
  }
  

  private convertToCSV(tasks: Task[]): string {
    const headers = 'ID,Title,Description,Due Date,Priority,Status,Created Date\n';
    const rows = tasks.map(task => {
      return [
        task.id,
        task.title,
        task.description || '',
        task.dueDate || '',
        task.priority,
        task.status,
        task.createdDate,
      ].join(',');
    }).join('\n');

    return headers + rows;
  }
}
