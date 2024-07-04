import { Component, signal, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AdminHeaderComponent,
    MatSidenavModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  @ViewChild('drawer') drawer!: MatDrawer;

  openDialogResponse() {
    this.drawer.toggle();
  }

}
