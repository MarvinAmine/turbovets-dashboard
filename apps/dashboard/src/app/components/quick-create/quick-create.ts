import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export type NewTaskPayload = { title: string; category?: string };

@Component({
  selector: 'app-quick-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quick-create.html',
  styleUrl: './quick-create.css',
})
export class QuickCreate {
  @Input() loading = false;
  @Output() create = new EventEmitter<NewTaskPayload>();

  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
    title: ['', [Validators.required]],
    category: [''],
  });
  }

  submit() {
    if (this.form.invalid) return;
    this.create.emit(this.form.value as NewTaskPayload);
    this.form.reset();
  }
}
