import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

export type LoginDto = { email: string; password: string; };
export type Task = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  ownerId: number;
  assigneeId?: number;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private cfg: ConfigService) {}

  login(dto: LoginDto): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.cfg.apiUrl}/auth/login`, dto);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.cfg.apiUrl}/tasks`);
  }

  createTask(payload: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.cfg.apiUrl}/tasks`, payload);
  }

  updateTask(id: number, payload: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.cfg.apiUrl}/tasks/${id}`, payload);
  }

  deleteTask(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.cfg.apiUrl}/tasks/${id}`);
  }

  getAudit(last = 50): Observable<string[]> {
    return this.http.get<string[]>(`${this.cfg.apiUrl}/audit-log?last=${last}`);
  }
}
