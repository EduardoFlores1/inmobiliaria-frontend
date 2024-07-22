import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-cliente-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './cliente-dialog.component.html',
  styleUrl: './cliente-dialog.component.scss'
})
export class ClienteDialogComponent {

}
