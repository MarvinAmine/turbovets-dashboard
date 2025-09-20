import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/core/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...(appConfig.providers ?? []),
  ],
}).catch(err => console.error(err));
