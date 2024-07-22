import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const admin: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path:'',
        redirectTo:'graficos',
        pathMatch: 'full'
      },
      {
        path: 'graficos',
        loadComponent: () => import('./modules/grafico/grafico.component'),
        title: 'Inmobiliaria - GRAFICOS',
      },
      {
        path: 'empleados',
        loadComponent: () => import('./modules/empleado/empleado.component'),
        title: 'Inmobiliaria - EMPLEADOS'
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./modules/usuario/usuario.component'),
        title: 'Inmobiliaria - USUARIOS'
      },
      {
        path: 'clientes',
        loadComponent: () => import('./modules/cliente/cliente.component'),
        title: 'Inmobiliaria - CLIENTES'
      },
      {
        path: 'ventas',
        loadComponent: () => import('./modules/ventas/ventas.component'),
        title: 'Inmobiliaria - VENTAS'
      },
    ]
  }
];

export default admin;