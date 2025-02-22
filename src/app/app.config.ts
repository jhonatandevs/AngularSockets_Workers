import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ErrorResponseInterceptor } from './shared/error-response.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(withFetch(), withInterceptors([ErrorResponseInterceptor]))]
};
