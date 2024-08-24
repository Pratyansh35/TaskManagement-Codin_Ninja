import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.routes').then(m => m.REGISTER_ROUTES)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routes').then(m => m.LOGIN_ROUTES),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES),
    ...canActivate(redirectUnauthorizedToLogin)
  }
];
