import { Injectable, computed, signal } from '@angular/core';
import { ApiService, Task } from './api.service';
import { firstValueFrom } from 'rxjs';

export type SortKey = 'created' | 'title' | 'status';
export type Status = Task['status'];

@Injectable({ providedIn: 'root' })
export class TasksStore {
  // raw tasks
  private _tasks = signal<Task[]>([]);
  __setTasks(arr: Task[]) {
    this._tasks.set(arr);
  }
  // ui state
  search = signal<string>('');
  sortBy = signal<SortKey>('created');
  category = signal<string>(''); // free text
  statusFilter = signal<Status | 'ALL'>('ALL');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private api: ApiService) {}

  readonly tasks = computed(() => this._tasks());

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase().trim();
    const cat = this.category().toLowerCase().trim();
    const sf = this.statusFilter();

    let arr = [...this._tasks()];
    if (q) arr = arr.filter(t => (t.title + ' ' + (t.description ?? '')).toLowerCase().includes(q));
    if (cat) arr = arr.filter(t => (t.category ?? '').toLowerCase().includes(cat));
    if (sf !== 'ALL') arr = arr.filter(t => t.status === sf);

    switch (this.sortBy()) {
      case 'title':
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'status':
        const order: Record<Status, number> = { TODO: 0, IN_PROGRESS: 1, DONE: 2 };
        arr.sort((a, b) => order[a.status] - order[b.status] || a.title.localeCompare(b.title));
        break;
      default:
        // created: assume higher id == newer
        arr.sort((a, b) => b.id - a.id);
    }
    return arr;
  });

  column(status: Status) {
    return computed(() => this.filtered().filter(t => t.status === status));
  }

  async load() {
    try {
      this.loading.set(true);
      this.error.set(null);
      const data = await firstValueFrom(this.api.getTasks());
      this._tasks.set(data ?? []);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Failed to load tasks');
    } finally {
      this.loading.set(false);
    }
  }

  async create(input: Partial<Task>) {
    try {
      this.loading.set(true);
      const created = await firstValueFrom(this.api.createTask(input));
      if (created) this._tasks.set([created, ...this._tasks()]);
      return created;
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: number, patch: Partial<Task>) {
    const prev = this._tasks();
    // optimistic update
    this._tasks.set(prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
    try {
      const saved = await firstValueFrom(this.api.updateTask(id, patch));
      if (saved) {
        this._tasks.set(this._tasks().map(t =>
          t.id === id ? { ...t, ...saved } : t
        ));
      }
    } catch {
      // rollback
      this._tasks.set(prev);
      throw new Error('Update failed');
    }
  }


  async remove(id: number) {
    const prev = this._tasks();
    this._tasks.set(prev.filter(t => t.id !== id));
    try {
      await firstValueFrom(this.api.deleteTask(id));
    } catch {
      this._tasks.set(prev);
      throw new Error('Delete failed');
    }
  }


}
