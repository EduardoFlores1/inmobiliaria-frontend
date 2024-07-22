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
import { VentaUseCaseService } from '../../../../../../domain/use-cases/venta/venta-use-case.service';
import { IDomainCreateVenta, IDomainVenta } from '../../../../../../domain/models/venta.model';
import { IDomainLote } from '../../../../../../domain/models/lote.model';
import { IDomainTipoLote } from '../../../../../../domain/models/tipo-lote.model';

@Component({
  selector: 'app-venta-dialog',
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
  templateUrl: './venta-dialog.component.html',
  styleUrl: './venta-dialog.component.scss'
})
export class VentaDialogComponent {

  private _formBuilder = inject(FormBuilder);

  // services
  private _authService = inject(AuthService);
  private _ventaService = inject(VentaUseCaseService);
  private _dateService = inject(DatePipe);

  // varibles
  private $sub = new Subscription;
  ventaDomain = signal<IDomainVenta | null>(null);

  listaClientes = signal<IDomainCliente[]>([]);
  listaLotes = signal<IDomainLote[]>([]);
  listaTipoLote = signal<IDomainTipoLote[]>([]);

  cliente = signal<IDomainCliente | null>(null);
  lote = signal<IDomainLote | null>(null);
  tipoLote = signal<IDomainTipoLote | null>(null);

  formGroup = this._formBuilder.group({
    cliente: ['', Validators.required],
    lote: ['', Validators.required],
    tipoLote: ['', Validators.required],
    detalles: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _dialogRef: MatDialogRef<VentaDialogComponent>) {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$sub?.unsubscribe();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarListas();
    if(this.data.item) {
      this.ventaDomain.set(this.data.item);
    }
    this.setInitialForm();
  }

  private setInitialForm() {
    if(this.ventaDomain()) {
      this.obtCliente(this.ventaDomain()?.cliente!);
      this.obtLote(this.ventaDomain()?.lote!);
      this.obtTipoLote(this.ventaDomain()?.tipoLote!);
      this.formGroup.setValue({
        cliente: this.ventaDomain()?.cliente.dni!,
        lote: this.ventaDomain()?.lote.manzana!,
        tipoLote: this.ventaDomain()?.tipoLote.descripcion!,
        detalles: this.ventaDomain()?.detalles!
      });
    }
  }

  cargarListas() {
    this.$sub.add(
      this._ventaService.listClientesOk(true).subscribe({
        next: (list) => {
          this.listaClientes.set(list);
        },
        error(err) {
          console.log(err)
        },
      })
    );

    this.$sub.add(
      this._ventaService.listLotesOk('Disponible').subscribe({
        next: (list) => {
          this.listaLotes.set(list);
        },
        error(err) {
          console.log(err)
        },
      })
    );

    this.$sub.add(
      this._ventaService.listTipoLotesOk().subscribe({
        next: (list) => {
          this.listaTipoLote.set(list);
        },
        error(err) {
          console.log(err)
        },
      })
    );
  }

  obtCliente(cliente: IDomainCliente) {
    this.cliente.set(cliente);
  }
  obtLote(lote: IDomainLote) {
    this.lote.set(lote);
  }
  obtTipoLote(tipoLote: IDomainTipoLote) {
    this.tipoLote.set(tipoLote);
  }

  buildCreteVenta() {
    const ventaCreate: IDomainCreateVenta = {
      usuario: this._authService.obtenerUserStorage()!,
      cliente: this.cliente()!,
      lote: this.lote()!,
      tipoLote: this.tipoLote()!,
      fechaVenta: this.buildDate(),
      detalles: this.formGroup.get('detalles')?.value!
    }
    return ventaCreate;
  }

  buildVenta() {
    const ventaDomain: IDomainVenta = {
      idVenta: this.ventaDomain()?.idVenta!,
      usuario: this._authService.obtenerUserStorage()!,
      cliente: this.cliente()!,
      lote: this.lote()!,
      tipoLote: this.tipoLote()!,
      fechaVenta: this.ventaDomain()?.fechaVenta!,
      detalles: this.formGroup.get('detalles')?.value!
    }
    return ventaDomain;
  }

  saveHandler() {
    if(this.ventaDomain()) {
      // editar
      console.log(this.buildVenta());
      this.$sub = this._ventaService.update(this.ventaDomain()?.idVenta!, this.buildVenta()).subscribe({
        next: () => {
          this._dialogRef.close('Actualización Exitosa');
        },
        error(err) {
          console.log(err)
        },
      });
    }else {
      // crear
      console.log(this.buildCreteVenta())
      this.$sub = this._ventaService.create(this.buildCreteVenta()).subscribe({
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
