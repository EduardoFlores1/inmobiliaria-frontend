import { Component, inject, signal } from '@angular/core';
import { EmpleadoTablaComponent } from './components/empleado-tabla/empleado-tabla.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Subscription } from 'rxjs';
import { IDomainEmpleado } from '../../../../domain/models/empleado.model';
import { AdminConfirmComponent } from '../../components/admin-confirm/admin-confirm.component';
import { EmpleadoDialogComponent } from './components/empleado-dialog/empleado-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmpleadoUseCaseService } from '../../../../domain/use-cases/empleado/empleado-use-case.service';
import {MatMenuModule} from '@angular/material/menu';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    EmpleadoTablaComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ProgressBarComponent
  ],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.scss'
})
export default class EmpleadoComponent {

  // services
  private _empleadoUseCaseService = inject(EmpleadoUseCaseService);

  //
  private dialog = inject(MatDialog);
  private subscriptions$ = new Subscription; 

  // variables
  empleados = signal<IDomainEmpleado[]>([]);
  showProgressBar = signal<boolean>(false);
  modeProgressBar = signal<ProgressBarMode>('query');

  constructor() {}

  ngOnInit(): void {
    this.readAll();
  }

  private readAll() {
    this.showProgressBar.set(true);
    this.subscriptions$?.add(
      this._empleadoUseCaseService.readAll()
      .pipe(
        finalize(() => this.showProgressBar.set(false))
      )
      .subscribe({
        next: (datos: IDomainEmpleado[]) => {
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
    const dialogRef = this.openDialog('REGISTRAR EMPLEADO', 'Registrar');

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
        }
      }
    );
  }

  editItemHandler(item: any) {
    const dialogRef = this.openDialog('EDITAR EMPLEADO', 'Actualizar', item);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
          console.log(result)
        }
      }
    );
  }

  deleteItemHandler(item: IDomainEmpleado) {
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
          this._empleadoUseCaseService.deleteById(item.idEmpleado).subscribe({
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
