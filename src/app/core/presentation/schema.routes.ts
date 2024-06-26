import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const schema: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./public/public.routes')
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes')
      }
    ]
  }
];

export default schema;