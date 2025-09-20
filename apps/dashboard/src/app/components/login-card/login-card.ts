import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export type LoginDto = { email: string; password: string };

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-card.html',
  styleUrl: './login-card.css',
})
export class LoginCard {
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() login = new EventEmitter<LoginDto>();

  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  }

  submit() {
    if (this.form.invalid) return;
    this.login.emit(this.form.value as LoginDto);
  }
}
