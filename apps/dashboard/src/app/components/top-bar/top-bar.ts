import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  @Input() search = '';
  @Input() statusFilter: 'ALL' | 'TODO' | 'IN_PROGRESS' | 'DONE' = 'ALL';
  @Input() sortBy: 'created' | 'title' | 'status' = 'created';
  @Input() isDark = false;
  @Input() authed = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() statusFilterChange = new EventEmitter<'ALL' | 'TODO' | 'IN_PROGRESS' | 'DONE'>();
  @Output() sortByChange = new EventEmitter<'created' | 'title' | 'status'>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onSearchInput(e: Event) {
    const v = (e.target as HTMLInputElement)?.value ?? '';
    this.searchChange.emit(v);
  }
  onStatusChange(e: Event) {
    const v = (e.target as HTMLSelectElement)?.value as any;
    this.statusFilterChange.emit(v);
  }
  onSortChange(e: Event) {
    const v = (e.target as HTMLSelectElement)?.value as any;
    this.sortByChange.emit(v);
  }
}
