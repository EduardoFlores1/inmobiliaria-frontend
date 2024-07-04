import { Component, inject } from '@angular/core';

import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-empleado-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './empleado-dialog.component.html',
  styleUrl: './empleado-dialog.component.scss'
})
export class EmpleadoDialogComponent {

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({

  });

  secondFormGroup = this._formBuilder.group({

  });

}
