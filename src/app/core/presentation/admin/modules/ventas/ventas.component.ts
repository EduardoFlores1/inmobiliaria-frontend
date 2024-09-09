import { Component, inject, signal } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Subscription } from 'rxjs';
import { AdminConfirmComponent } from '../../components/admin-confirm/admin-confirm.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IDomainCliente } from '../../../../domain/models/cliente.model';
import { ClienteUseCaseService } from '../../../../domain/use-cases/cliente/cliente-use-case.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { VentaTablaComponent } from './components/venta-tabla/venta-tabla.component';
import { VentaUseCaseService } from '../../../../domain/use-cases/venta/venta-use-case.service';
import { IDomainVenta } from '../../../../domain/models/venta.model';
import { VentaDialogComponent } from './components/venta-dialog/venta-dialog.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    VentaTablaComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ProgressBarComponent
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export default class VentasComponent {

  // services
  private _ventaUseCaseService = inject(VentaUseCaseService);

  //
  private dialog = inject(MatDialog);
  private subscriptions$ = new Subscription; 

  // variables
  ventas = signal<IDomainVenta[]>([]);
  showProgressBar = signal<boolean>(false);
  modeProgressBar = signal<ProgressBarMode>('query');

  ngOnInit(): void {
    this.readAll();
  }

  private readAll() {
    this.showProgressBar.set(true)
    this.subscriptions$?.add(
      this._ventaUseCaseService.readAll()
      .pipe(
        finalize(() => this.showProgressBar.set(false))
      )
      .subscribe({
        next: (datos: IDomainVenta[]) => {
          this.ventas.set(datos);
        },
        error(err) {
          console.log(err)
        },
      })
    );
  }


  // open dialog component
  private openDialog(titulo: string, accionTitulo: string, item?: any) {
    return this.dialog.open(VentaDialogComponent, {
      autoFocus: false,
      data: {
        titulo: titulo,
        accionTitulo: accionTitulo,
        item: item,
      }
    })
  }

  agregarItem() {
    const dialogRef = this.openDialog('REGISTRAR VENTA', 'Registrar');

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
        }
      }
    );
  }

  editItemHandler(item: any) {
    const dialogRef = this.openDialog('EDITAR VENTA', 'Actualizar', item);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
          console.log(result)
        }
      }
    );
  }

}
