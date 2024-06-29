import { Component, inject, signal } from '@angular/core';
import { EmpleadoTablaComponent } from './components/empleado-tabla/empleado-tabla.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoRepositoryImplService } from '../../../../infraestructure/repositories/empleado/empleado.repository.impl.service';
import { Subscription } from 'rxjs';
import { EmpleadoEntity } from '../../../../domain/models/empleado.model';
import { AdminConfirmComponent } from '../../components/admin-confirm/admin-confirm.component';
import { EmpleadoDialogComponent } from './components/empleado-dialog/empleado-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    EmpleadoTablaComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.scss'
})
export default class EmpleadoComponent {

  // services
  private _empleadosServ = inject(EmpleadoRepositoryImplService);

  //
  private dialog = inject(MatDialog);
  private subscriptions$ = new Subscription; 

  // variables
  empleados = signal<EmpleadoEntity[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.readAll();
  }

  private readAll() {
    this.subscriptions$?.add(
      this._empleadosServ.readAll().subscribe({
        next: (datos: EmpleadoEntity[]) => {
          this.empleados.set(datos);
        },
        error(err) {
          console.log(err)
        },
      })
    );
  }

  // open dialog component
   private openDialog(titulo: string, accionTitulo: string, item?: any) {
    return this.dialog.open(EmpleadoDialogComponent, {
      autoFocus: false,
      data: {
        titulo: titulo,
        accionTitulo: accionTitulo,
        item: item,
      }
    })
  }

  agregarItem() {
    const dialogRef = this.openDialog('REGISTRAR ALMACENAMIENTO', 'Registrar');

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
        }else {
          console.log('No se registro el almacen')
        }
      }
    );
  }

  editItemHandler(item: any) {
    const dialogRef = this.openDialog('EDITAR ALMACENAMIENTO', 'Actualizar', item);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
          console.log(result)
        }else {
          console.log('No se editó el almacen')
        }
      }
    );
  }

  deleteItemHandler(item: EmpleadoEntity) {
    const dialogRef =  this.dialog.open(AdminConfirmComponent, {
      data: {
        color: 'warn',
        icon: 'delete',
        descripcion: `El item con ID: ${item.idEmpleado} será eliminado`,
        accionTitulo: 'Eliminar',
      }
    });

    dialogRef.afterClosed().subscribe(
      (result: string) => {
        if(result === 'accept') {
          this._empleadosServ.deleteById(item.idEmpleado).subscribe({
            next: () => {
              this.readAll();
              console.log('delete ok')
            },
            error(err) {
              console.log(err)
            },
          })
        }else {
          console.log('cancela eliminacion')
        }
      }
    );
  }
}
