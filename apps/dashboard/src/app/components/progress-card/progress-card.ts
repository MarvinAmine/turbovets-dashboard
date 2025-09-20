import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-card.html',
  styleUrl: './progress-card.css',
})
export class ProgressCard {
  @Input() doneCount = 0;
  @Input() totalCount = 0;

  get pct(): number {
    return this.totalCount === 0 ? 0 : (this.doneCount / this.totalCount) * 100;
  }
}
