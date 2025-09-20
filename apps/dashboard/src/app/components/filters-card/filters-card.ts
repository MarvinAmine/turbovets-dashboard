import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters-card.html',
  styleUrl: './filters-card.css',
})
export class FiltersCard {
  @Input() category = '';
  @Output() categoryChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  onCategoryInput(e: Event) {
    const v = (e.target as HTMLInputElement)?.value ?? '';
    this.categoryChange.emit(v);
  }
}
