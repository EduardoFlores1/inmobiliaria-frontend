import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';

const publicR: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path:'',
        redirectTo:'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./modules/home/home.component'),
        title: 'Inmobiliaria - HOME'
      }
    ]
  }
];

export default publicR;