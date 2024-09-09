import { Component, Inject, inject, signal } from '@angular/core';

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
import { IDomainCreateEmpleado, IDomainEmpleado } from '../../../../../../domain/models/empleado.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadoUseCaseService } from '../../../../../../domain/use-cases/empleado/empleado-use-case.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-empleado-dialog',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    DatePipe
  ],
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

  // services
  private _empleadoUseCase = inject(EmpleadoUseCaseService);
  private _dateService = inject(DatePipe);

  // varibles
  private $sub: Subscription | undefined;
  empleadoDomain = signal<IDomainEmpleado | null>(null);

  firstFormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    telefono: ['', [Validators.required, Validators.minLength(9) , Validators.maxLength(9)]],
    direccion: ['', [Validators.required, Validators.minLength(3)]],
    cargo: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]]
  });

  secondFormGroup = this._formBuilder.group({
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    tipoContrato: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _dialogRef: MatDialogRef<EmpleadoDialogComponent>) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.data.item) this.empleadoDomain.set(this.data.item);
    this.setInitialForm();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$sub?.unsubscribe();
  }

  private setInitialForm() {
    if(this.empleadoDomain()) {
      this.firstFormGroup.setValue({
        nombre: this.empleadoDomain()?.nombre!,
        apellido: this.empleadoDomain()?.apellido!,
        dni: this.empleadoDomain()?.dni!,
        telefono: this.empleadoDomain()?.telefono!,
        direccion: this.empleadoDomain()?.direccion!,
        cargo: this.empleadoDomain()?.cargo!,
        email: this.empleadoDomain()?.email!
      })
      this.secondFormGroup.setValue({
        fechaInicio: new Date(this.empleadoDomain()?.contratoDTO.fechaInicio!).toISOString(),
        fechaFin: new Date(this.empleadoDomain()?.contratoDTO.fechaFin!).toISOString(),
        tipoContrato: this.empleadoDomain()?.contratoDTO.tipoContrato!
      });
    }
  }

  buildCreateEmpleado() {
    const empleadoCreate: IDomainCreateEmpleado = {
      nombre: this.firstFormGroup.get('nombre')?.value!,
      apellido: this.firstFormGroup.get('apellido')?.value!,
      email: this.firstFormGroup.get('email')?.value!,
      dni: this.firstFormGroup.get('dni')?.value!,
      telefono: this.firstFormGroup.get('telefono')?.value!,
      direccion: this.firstFormGroup.get('direccion')?.value!,
      fechaContratacion: this.buildDate(),
      cargo: this.firstFormGroup.get('cargo')?.value!,
      estado: true,
      contratoCreateDTO: {
        fechaInicio: this.buildDate(this.secondFormGroup.get('fechaInicio')?.value!),
        fechaFin: this.buildDate(this.secondFormGroup.get('fechaFin')?.value!),
        tipoContrato: this.secondFormGroup.get('tipoContrato')?.value!
      }
    }
    return empleadoCreate;
  }

  buildEmpleado() {
    const empleadoDomain: IDomainEmpleado = {
      idEmpleado: this.empleadoDomain()?.idEmpleado!,
      nombre: this.firstFormGroup.get('nombre')?.value!,
      apellido: this.firstFormGroup.get('apellido')?.value!,
      email: this.firstFormGroup.get('email')?.value!,
      dni: this.firstFormGroup.get('dni')?.value!,
      telefono: this.firstFormGroup.get('telefono')?.value!,
      direccion: this.firstFormGroup.get('direccion')?.value!,
      fechaContratacion: this.empleadoDomain()?.fechaContratacion!,
      cargo: this.firstFormGroup.get('cargo')?.value!,
      estado: this.empleadoDomain()?.estado!,
      contratoDTO: {
        idContrato: this.empleadoDomain()?.contratoDTO.idContrato!,
        fechaInicio: this.buildDate(this.secondFormGroup.get('fechaInicio')?.value!),
        fechaFin: this.buildDate(this.secondFormGroup.get('fechaFin')?.value!),
        tipoContrato: this.secondFormGroup.get('tipoContrato')?.value!
      }
    }
    return empleadoDomain;
  }

  saveHandler() {
    if(this.empleadoDomain()) {
      // editar
      this.$sub = this._empleadoUseCase.update(this.empleadoDomain()?.idEmpleado!, this.buildEmpleado()).subscribe({
        next: () => {
          this._dialogRef.close('Actualización Exitosa');
        },
        error(err) {
          console.log(err)
        },
      });
    }else {
      // crear
      this.$sub = this._empleadoUseCase.create(this.buildCreateEmpleado()).subscribe({
        next: () => {
          this._dialogRef.close('Registro Exitoso');
        },
        error(err) {
          console.log(err)
        },
      });
    }
  }

  private buildDate(fecha?: string): string {
    if(fecha) {
      // transform date recived
      return this._dateService.transform(fecha, "yyyy-MM-dd'T'HH:mm:ss", 'es-PE')!;
    }else {
      // current date
      return this._dateService.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss", 'es-PE')!;
    }
  }

}
