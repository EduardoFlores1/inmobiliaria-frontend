import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-response-not-found-404',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLinkWithHref
  ],
  templateUrl: './response-not-found-404.component.html',
  styleUrl: './response-not-found-404.component.scss'
})
export default class ResponseNotFound404Component {

}
