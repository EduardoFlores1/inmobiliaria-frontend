import { Component, inject, signal } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Subscription } from 'rxjs';
import { AdminConfirmComponent } from '../../components/admin-confirm/admin-confirm.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IDomainUsuario } from '../../../../domain/models/usuario.model';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { UsuarioTablaComponent } from './components/usuario-tabla/usuario-tabla.component';
import { UsuarioUseCaseService } from '../../../../domain/use-cases/usuario/usuario-use-case.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    UsuarioTablaComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ProgressBarComponent
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export default class UsuarioComponent {

  // services
  private _usuarioUseCaseService = inject(UsuarioUseCaseService);

  //
  private dialog = inject(MatDialog);
  private subscriptions$ = new Subscription; 

  // variables
  usuarios = signal<IDomainUsuario[]>([]);
  showProgressBar = signal<boolean>(false);
  modeProgressBar = signal<ProgressBarMode>('query');

  constructor() {}

  ngOnInit(): void {
    this.readAll();
  }

  private readAll() {
    this.showProgressBar.set(true);
    this.subscriptions$?.add(
      this._usuarioUseCaseService.readAll()
      .pipe(
        finalize(() => this.showProgressBar.set(false))
      )
      .subscribe({
        next: (datos: IDomainUsuario[]) => {
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
    const dialogRef = this.openDialog('REGISTRAR USUARIO', 'Registrar');

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
        }
      }
    );
  }

  editItemHandler(item: any) {
    const dialogRef = this.openDialog('EDITAR USUARIO', 'Actualizar', item);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.readAll();
          console.log(result)
        }
      }
    );
  }

  deleteItemHandler(item: IDomainUsuario) {
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
          this._usuarioUseCaseService.deleteById(item.idUsuario).subscribe({
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
