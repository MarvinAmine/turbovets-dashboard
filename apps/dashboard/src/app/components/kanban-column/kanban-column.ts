import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../core/api.service';

export type Status = Task['status'];

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './kanban-column.html',
  styleUrl: './kanban-column.css',
})
export class KanbanColumn {
  @Input() label = '';
  @Input() statusKey!: Status;
  @Input() tasks: Task[] = [];

  @Output() statusChange = new EventEmitter<{ task: Task; status: Status }>();
  @Output() remove = new EventEmitter<Task>();
  @Output() dropped = new EventEmitter<{ evt: CdkDragDrop<Task[]>; dest: Status }>();

  onDropped(evt: CdkDragDrop<Task[]>) {
    this.dropped.emit({ evt, dest: this.statusKey });
  }

  setStatus(task: Task, status: Status) {
    this.statusChange.emit({ task, status });
  }
}
