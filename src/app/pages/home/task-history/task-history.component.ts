import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {
  @Input() task: Task | null = null;
  historyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.historyForm = this.fb.group({
      history: [[]]
    });
  }

  ngOnInit(): void {
    if (this.task && this.task.history) {
      this.historyForm.patchValue({
        history: this.task.history
      });
    }
  }
}
