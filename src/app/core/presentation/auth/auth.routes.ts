import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

const auth: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children : [
      {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./modules/auth-login/auth-login.component'),
        title: 'Inmobiliaria - LOGIN'
      }
    ]
}
]

export default auth;