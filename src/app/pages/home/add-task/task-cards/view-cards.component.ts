import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/task.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ViewCardsComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  private tasksSubscription: Subscription | null = null;
  @ViewChild('taskSlider') taskSlider!: ElementRef;

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
   
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = [...this.tasks]; // Initialize filteredTasks with all tasks
      this.cdr.detectChanges(); // to detect changes
    });

    
    this.taskService.getAllTasks().then(tasks => {
      this.tasks = tasks;
      this.filteredTasks = [...this.tasks]; 
      this.cdr.detectChanges(); 
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    });
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  getRemainingTime(dueDate?: string): string {
    if (!dueDate) return 'No due date';

    const due = new Date(dueDate).getTime();
    const now = new Date().getTime();
    const diff = due - now;

    if (diff <= 0) return 'Overdue';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m remaining`;
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'bg-gradient-to-br from-green-500 to-green-700';
      case 'medium':
        return 'bg-gradient-to-br from-yellow-500 to-yellow-700';
      case 'high':
        return 'bg-gradient-to-br from-red-500 to-red-700';
      default:
        return 'bg-gradient-to-br from-blue-500 to-blue-700';
    }
  }

  scrollTo(direction: 'left' | 'right') {
    const slider = this.taskSlider.nativeElement;
    const scrollAmount = slider.offsetWidth;
    if (direction === 'right') {
      slider.scrollLeft += scrollAmount;
    } else {
      slider.scrollLeft -= scrollAmount;
    }
  }

  sortTasks(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const criterion = selectElement.value;

    switch (criterion) {
      case 'dueDate':
        this.filteredTasks.sort((a, b) => new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime());
        break;
      case 'createdDate':
        this.filteredTasks.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        break;
      case 'status':
        const statusOrder = { 'to-do': 1, 'in-progress': 2, 'completed': 3 } as const;
        this.filteredTasks.sort((a, b) => statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]);
        break;
      default:
        this.filteredTasks = [...this.tasks];
    }
    this.cdr.detectChanges();
  }

  filterTasks(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;

    if (!status) {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === status);
    }
  }
}
