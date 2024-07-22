import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { IDomainUsuario } from '../../../domain/models/usuario.model';
import { Subscription } from 'rxjs';

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

  private _authService = inject(AuthService);

  usuarioDomain = signal<IDomainUsuario | null>(null);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadUser();
  }

  openDialogResponse() {
    this.drawer.toggle();
  }

  loadUser() {
    this.usuarioDomain.set(this._authService.obtenerUserStorage());
  }

}
