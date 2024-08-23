import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"task-manager-9e92d","appId":"1:406064806353:web:2f53d47db82b9878dfc8f0","storageBucket":"task-manager-9e92d.appspot.com","apiKey":"AIzaSyBiWIWO8Z9OT75mx9wtxd5XFr5g0QCabgI","authDomain":"task-manager-9e92d.firebaseapp.com","messagingSenderId":"406064806353","measurementId":"G-WTK4DG8HLC"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())]
};
