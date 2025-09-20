import { Component, HostListener, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ApiService, Task } from './core/api.service';
import { AuthStore } from './core/auth.store';
import { TasksStore } from './core/tasks.store';

import { TopBar } from './components/top-bar/top-bar';
import { LoginCard, LoginDto } from './components/login-card/login-card';
import { QuickCreate, NewTaskPayload } from './components/quick-create/quick-create';
import { ProgressCard } from './components/progress-card/progress-card';
import { FiltersCard } from './components/filters-card/filters-card';
import { KanbanColumn } from './components/kanban-column/kanban-column';

import { firstValueFrom } from 'rxjs';

type Status = Task['status'];

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    DragDropModule,
    TopBar,
    LoginCard,
    QuickCreate,
    ProgressCard,
    FiltersCard,
    KanbanColumn,
  ],
  templateUrl: './app.html'
})
export class AppComponent {
  // ui + stores
  loading = computed(() => this.tasks.loading());
  error = computed(() => this.tasks.error());
  columns = [
    { key: 'TODO' as Status, label: 'To Do' },
    { key: 'IN_PROGRESS' as Status, label: 'In Progress' },
    { key: 'DONE' as Status, label: 'Done' },
  ];

  // derived metrics
  totalCount = computed(() => this.tasks.tasks().length);
  doneCount = computed(() => this.tasks.tasks().filter(t => t.status === 'DONE').length);

  isDark = signal<boolean>(document.documentElement.classList.contains('dark'));

  constructor(
    private api: ApiService,
    public auth: AuthStore,
    public tasks: TasksStore,
  ) {
    effect(() => { if (this.auth.isAuthed()) this.tasks.load(); });
  }

  // theme
  toggleTheme() {
    const next = !this.isDark();
    this.isDark.set(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
  }

  // auth
  async onLogin(dto: LoginDto) {
    try {

      const res = await firstValueFrom(this.api.login(dto));
      if (res) {
        this.auth.setToken(res.accessToken);
        await this.tasks.load();
      }
    } catch (e) { console.error(e); }
  }
  logout() { this.auth.logout(); }

  // quick create
  async onCreate(payload: NewTaskPayload) {
    await this.tasks.create(payload);
  }

  // filters (top bar + filters card)
  setSearch(v: string) { this.tasks.search.set(v); }
  setStatusFilter(v: 'ALL' | Status) { this.tasks.statusFilter.set(v); }
  setSortBy(v: 'created' | 'title' | 'status') { this.tasks.sortBy.set(v as any); }
  setCategory(v: string) { this.tasks.category.set(v); }
  clearFilters() {
    this.tasks.search.set('');
    this.tasks.category.set('');
    this.tasks.statusFilter.set('ALL');
    this.tasks.sortBy.set('created');
  }

  // kanban helpers
  column(status: Status) { return this.tasks.column(status); }
  columnCount(status: Status) { return this.column(status)().length; }

  async setStatus(t: Task, status: Status) {
    if (t.status === status) return;
    await this.tasks.update(t.id, { status });
  }
  async remove(t: Task) { await this.tasks.remove(t.id); }

  async onDropped({ evt, dest }: { evt: CdkDragDrop<Task[]>; dest: Status }) {
    const tasks = [...this.tasks.tasks()]; // clone array

    if (evt.previousContainer === evt.container) {
      // reorder inside same column
      const colTasks = tasks.filter(t => t.status === dest);
      const [moved] = colTasks.splice(evt.previousIndex, 1);
      colTasks.splice(evt.currentIndex, 0, moved);

      // rebuild full tasks list
      this.tasks['__setTasks']( // we'll expose a helper
        tasks.map(t => (t.status === dest ? colTasks.find(ct => ct.id === t.id) ?? t : t))
      );
    } else {
      // moving across columns
      const item = { ...evt.previousContainer.data[evt.previousIndex], status: dest };
      await this.setStatus(item, dest);
    }
  }


  // shortcuts
  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === '/' && this.auth.isAuthed()) {
      e.preventDefault();
      const input = document.querySelector('input[placeholder="Search ( / )"]') as HTMLInputElement | null;
      input?.focus();
    }
    if ((e.key === 'n' || e.key === 'N') && this.auth.isAuthed()) {
      e.preventDefault();
      const input = document.querySelector('input[placeholder="Task title"]') as HTMLInputElement | null;
      input?.focus();
    }
  }
}
