import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura'; 
import { MyPreset } from './mypreset';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),withEnabledBlockingInitialNavigation()),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: MyPreset, options: { 
      darkModeSelector: '.app-dark',
      // cssLayer: {
      //   name: 'primeng',
      //   order: 'primeng, app-styles'
      // }

     } } })
  ]
};
