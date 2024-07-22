import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-usuario-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.scss'
})
export class UsuarioDialogComponent {

}
