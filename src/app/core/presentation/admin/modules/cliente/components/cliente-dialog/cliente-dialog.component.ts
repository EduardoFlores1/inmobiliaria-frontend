import { Component, Inject, inject, signal } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from '../../../../../auth/services/auth.service';
import { ClienteUseCaseService } from '../../../../../../domain/use-cases/cliente/cliente-use-case.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { IDomainCliente, IDomainCreateCliente } from '../../../../../../domain/models/cliente.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-cliente-dialog',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    DatePipe
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './cliente-dialog.component.html',
  styleUrl: './cliente-dialog.component.scss'
})
export class ClienteDialogComponent {

  private _formBuilder = inject(FormBuilder);

  // services
  private _authService = inject(AuthService);
  private _clienteService = inject(ClienteUseCaseService);
  private _dateService = inject(DatePipe);

  // varibles
  private $sub: Subscription | undefined;
  clienteDomain = signal<IDomainCliente | null>(null);


  formGroup = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    telefono: ['', [Validators.required, Validators.minLength(9) , Validators.maxLength(9)]],
    email: ['', [Validators.required, Validators.email]],
    tipoEstado: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['', [Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _dialogRef: MatDialogRef<ClienteDialogComponent>) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.data.item) {
      this.clienteDomain.set(this.data.item);
    }
    this.setInitialForm();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$sub?.unsubscribe();
  }

  private setInitialForm() {
    if(this.clienteDomain()) {
      this.formGroup.setValue({
        nombre: this.clienteDomain()?.nombre!,
        apellido: this.clienteDomain()?.apellido!,
        dni: this.clienteDomain()?.dni!,
        telefono: this.clienteDomain()?.telefono!,
        email: this.clienteDomain()?.email!,
        tipoEstado: this.clienteDomain()?.tipoEstado!,
        estado: this.clienteDomain()?.estado! == true ? 'Activo' : 'Inactivo'
      });
    }
  }

  buildCreateCliente() {
    const clienteCreate: IDomainCreateCliente = {
      nombre: this.formGroup.get('nombre')?.value!,
      apellido: this.formGroup.get('apellido')?.value!,
      dni: this.formGroup.get('dni')?.value!,
      telefono: this.formGroup.get('telefono')?.value!,
      email: this.formGroup.get('email')?.value!,
      fechaRegistro: this.buildDate(),
      tipoEstado: this.formGroup.get('tipoEstado')?.value!,
      estado: this.formGroup.get('estado')?.value! === 'Activo' ? true : false,
      usuarioDTO: this._authService.obtenerUserStorage()!
    }
    return clienteCreate;
  }

  buildCliente() {
    const clienteDomain: IDomainCliente = {
      idCliente: this.clienteDomain()?.idCliente!,
      nombre: this.formGroup.get('nombre')?.value!,
      apellido: this.formGroup.get('apellido')?.value!,
      dni: this.formGroup.get('dni')?.value!,
      telefono: this.formGroup.get('telefono')?.value!,
      email: this.formGroup.get('email')?.value!,
      fechaRegistro: this.clienteDomain()?.fechaRegistro!,
      tipoEstado: this.formGroup.get('tipoEstado')?.value!,
      estado: this.formGroup.get('estado')?.value! === 'Activo' ? true : false,
    }
    return clienteDomain;
  }

  saveHandler() {
    if(this.clienteDomain()) {
      // editar
      this.$sub = this._clienteService.update(this.clienteDomain()?.idCliente!, this.buildCliente()).subscribe({
        next: () => {
          this._dialogRef.close('Actualización Exitosa');
        },
        error(err) {
          console.log(err)
        },
      });
    }else {
      // crear
      console.log(this.buildCreateCliente())
      this.$sub = this._clienteService.create(this.buildCreateCliente()).subscribe({
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
