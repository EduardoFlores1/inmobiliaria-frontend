import { Component, EventEmitter, Output, signal } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  @Output() open =  new EventEmitter();

  // variables
  private isOpen = signal<boolean>(false);

  openSidenav() {
    this.isOpen.update(state => !state);
    this.open.emit(this.isOpen());
  }

}
