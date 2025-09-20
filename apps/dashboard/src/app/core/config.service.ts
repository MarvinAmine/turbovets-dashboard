// Minimal runtime config reader. Use this in your services to resolve API base URL.
import { Injectable } from '@angular/core';

type Env = {
  API_URL?: string;
  APP_NAME?: string;
  LOG_LEVEL?: string;
};

declare global {
  interface Window { __env?: Env; }
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly env: Env = (window as any).__env || {};

  get apiUrl(): string {
    return this.env['API_URL'] || 'http://localhost:3001';
  }

  get appName(): string {
    return this.env['APP_NAME'] || 'TurboVets Dashboard';
  }

  get logLevel(): string {
    return this.env['LOG_LEVEL'] || 'info';
  }
}
