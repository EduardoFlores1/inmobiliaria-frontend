import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.scss'
})
export class PublicHeaderComponent {

}
