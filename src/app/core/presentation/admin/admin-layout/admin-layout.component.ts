import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
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

  // variables
  isOpenSidenav = signal<boolean>(false);

  openDialogResponse(estado: boolean) {
    this.isOpenSidenav.set(estado);
  }

}
