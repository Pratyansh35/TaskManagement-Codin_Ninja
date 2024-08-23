import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.routes').then((m) => m.REGISTER_ROUTES)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.routes').then((m) => m.LOGIN_ROUTES)
    }
];
