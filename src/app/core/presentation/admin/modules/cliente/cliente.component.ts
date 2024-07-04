import { Component, inject, signal } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminConfirmComponent } from '../../components/admin-confirm/admin-confirm.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteTablaComponent } from './components/cliente-tabla/cliente-tabla.component';
import { IDomainCliente } from '../../../../domain/models/cliente.model';
import { ClienteDialogComponent } from './components/cliente-dialog/cliente-dialog.component';
import { ClienteUseCaseService } from '../../../../domain/use-cases/cliente/cliente-use-case.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    ClienteTablaComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export default class ClienteComponent {

    // services
    private _clienteUseCaseService = inject(ClienteUseCaseService);

    //
    private dialog = inject(MatDialog);
    private subscriptions$ = new Subscription; 
  
    // variables
    clientes = signal<IDomainCliente[]>([]);
  
    constructor() {}
  
    ngOnInit(): void {
      this.readAll();
    }
  
    private readAll() {
      this.subscriptions$?.add(
        this._clienteUseCaseService.readAll().subscribe({
          next: (datos: IDomainCliente[]) => {
            this.clientes.set(datos);
          },
          error(err) {
            console.log(err)
          },
        })
      );
    }
  
    // open dialog component
     private openDialog(titulo: string, accionTitulo: string, item?: any) {
      return this.dialog.open(ClienteDialogComponent, {
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
  
    deleteItemHandler(item: IDomainCliente) {
      const dialogRef =  this.dialog.open(AdminConfirmComponent, {
        data: {
          color: 'warn',
          icon: 'delete',
          descripcion: `El item con ID: ${item.idCliente} será eliminado`,
          accionTitulo: 'Eliminar',
        }
      });
  
      dialogRef.afterClosed().subscribe(
        (result: string) => {
          if(result === 'accept') {
            this._clienteUseCaseService.deleteById(item.idCliente).subscribe({
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
