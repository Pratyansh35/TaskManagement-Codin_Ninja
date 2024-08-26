import { Injectable } from '@angular/core';
import { Task } from '../../../models/task.model';
import { BehaviorSubject } from 'rxjs';
import { saveAs } from 'file-saver'; // Only if using file-saver

@Injectable({
  providedIn: 'root'
})
export class ExportTasks {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  exportTasksToCSV(tasks: Task[]): void {
    const csvData = this.convertToCSV(tasks);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const fileName = 'tasks.csv';
    saveAs(blob, fileName); // Using file-saver to trigger download
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
