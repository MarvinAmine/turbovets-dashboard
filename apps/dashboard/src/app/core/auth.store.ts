import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _token = signal<string | null>(localStorage.getItem('accessToken'));

  readonly token = computed(() => this._token());
  readonly isAuthed = computed(() => !!this._token());

  setToken(jwt: string) {
    localStorage.setItem('accessToken', jwt);
    this._token.set(jwt);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this._token.set(null);
  }
}
