import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/presentation/schema.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/presentation/auth/auth.routes'),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './core/presentation/shared/components/response-not-found-404/response-not-found-404.component'
      ),
  },
];
