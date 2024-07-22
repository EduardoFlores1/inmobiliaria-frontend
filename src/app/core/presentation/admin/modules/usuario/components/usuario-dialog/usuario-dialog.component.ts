import { Component, Inject, inject, signal } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { UsuarioUseCaseService } from '../../../../../../domain/use-cases/usuario/usuario-use-case.service';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { IDomainCreateUsuario, IDomainUsuario } from '../../../../../../domain/models/usuario.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-usuario-dialog',
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
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.scss'
})
export class UsuarioDialogComponent {

  private _formBuilder = inject(FormBuilder);

  // services
  private _authService = inject(AuthService);
  private _usuarioUseCase = inject(UsuarioUseCaseService);
  private _dateService = inject(DatePipe);

  // varibles
  private $sub: Subscription | undefined;
  usuarioDomain = signal<IDomainUsuario | null>(null);


  formGroup = this._formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    rol: ['', [Validators.required, Validators.minLength(3)]],
    equipoVenta: ['',[Validators.required]],
    estado: ['', [Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _dialogRef: MatDialogRef<UsuarioDialogComponent>) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.data.item) {
      this.usuarioDomain.set(this.data.item);
      this.formGroup.get('password')?.disable();
    }
    this.setInitialForm();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$sub?.unsubscribe();
  }

  private setInitialForm() {
    if(this.usuarioDomain()) {
      this.formGroup.setValue({
        username: this.usuarioDomain()?.username!,
        password: '********',
        rol: this.usuarioDomain()?.rol!,
        equipoVenta: this.usuarioDomain()?.equipoVenta!.toString()!,
        estado: this.usuarioDomain()?.estado! == true ? 'Activo' : 'Inactivo'
      });
    }
  }

  buildCreateUsuario() {
    const usuarioCreate: IDomainCreateUsuario = {
      username: this.formGroup.get('username')?.value!,
      password: this.formGroup.get('password')?.value!,
      rol: this.formGroup.get('rol')?.value!,
      equipoVenta: Number.parseFloat(this.formGroup.get('equipoVenta')?.value!),
      fechaRegistro: this.buildDate(),
      estado: this.formGroup.get('estado')?.value! === 'Activo' ? true : false,
      empleadoDTO: this._authService.obtenerUserStorage()?.empleadoDTO!
    }
    return usuarioCreate;
  }

  buildUsuario() {
    const usuarioDomain: IDomainUsuario = {
      idUsuario: this.usuarioDomain()?.idUsuario!,
      username: this.formGroup.get('username')?.value!,
      rol: this.formGroup.get('rol')?.value!,
      equipoVenta: Number.parseFloat(this.formGroup.get('equipoVenta')?.value!),
      fechaRegistro: this.usuarioDomain()?.fechaRegistro!,
      estado: this.formGroup.get('estado')?.value! === 'Activo' ? true : false,
      empleadoDTO: this._authService.obtenerUserStorage()?.empleadoDTO!
    }

    return usuarioDomain;
  }

  saveHandler() {
    if(this.usuarioDomain()) {
      // editar
      this.$sub = this._usuarioUseCase.update(this.usuarioDomain()?.idUsuario!, this.buildUsuario()).subscribe({
        next: () => {
          this._dialogRef.close('Actualización Exitosa');
        },
        error(err) {
          console.log(err)
        },
      });
    }else {
      // crear
      this.$sub = this._usuarioUseCase.create(this.buildCreateUsuario()).subscribe({
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
