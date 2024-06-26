import { Component, inject, signal } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminConfirmComponent } from '../../components/admin-confirm/admin-confirm.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UsuarioRepositoryImplService } from '../../../../infraestructure/repositories/usuario/usuario.repository.impl.service';
import { UsuarioEntity } from '../../../../domain/entities/usuario.entity';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { UsuarioTablaComponent } from './components/usuario-tabla/usuario-tabla.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    UsuarioTablaComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export default class UsuarioComponent {

  // services
  private _usuariosServ = inject(UsuarioRepositoryImplService);

  //
  private dialog = inject(MatDialog);
  private subscriptions$ = new Subscription; 

  // variables
  usuarios = signal<UsuarioEntity[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.readAll();
  }

  private readAll() {
    this.subscriptions$?.add(
      this._usuariosServ.readAll().subscribe({
        next: (datos: UsuarioEntity[]) => {
          this.usuarios.set(datos);
        },
        error(err) {
          console.log(err)
        },
      })
    );
  }

  // open dialog component
   private openDialog(titulo: string, accionTitulo: string, item?: any) {
    return this.dialog.open(UsuarioDialogComponent, {
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

  deleteItemHandler(item: UsuarioEntity) {
    const dialogRef =  this.dialog.open(AdminConfirmComponent, {
      data: {
        color: 'warn',
        icon: 'delete',
        descripcion: `El item con ID: ${item.idUsuario} será eliminado`,
        accionTitulo: 'Eliminar',
      }
    });

    dialogRef.afterClosed().subscribe(
      (result: string) => {
        if(result === 'accept') {
          this._usuariosServ.deleteById(item.idUsuario).subscribe({
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
