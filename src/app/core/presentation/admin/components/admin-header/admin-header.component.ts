import { Component, EventEmitter, inject, Output, signal } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { TokenService } from '../../../auth/services/token.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  @Output() open =  new EventEmitter();

  // services
  private _tokenService = inject(TokenService);
  private _router = inject(Router);

  openSidenav() {
    this.open.emit();
  }

  cerrarSesion() {
    this._tokenService.removeToken();
    this._router.navigateByUrl('/');
  }

}
