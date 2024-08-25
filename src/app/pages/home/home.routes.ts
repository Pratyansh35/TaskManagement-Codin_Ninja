// home.routes.ts
import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTasksComponent } from './view-task/view-task.component';
// import { ExportTasksComponent } from './export-tasks/export-tasks.component';
// import { TaskHistoryComponent } from './task-history/task-history.component';
export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeLayoutComponent,
    children: [
     { path: 'add-task', component: AddTaskComponent },
      { path: 'view-tasks', component: ViewTasksComponent },
    //   { path: 'export-tasks', component: ExportTasksComponent },
    //   { path: 'task-history', component: TaskHistoryComponent },
      { path: '', redirectTo: 'add-task', pathMatch: 'full' } // Default route
    ]
  }
];
