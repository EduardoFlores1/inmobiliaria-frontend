import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsuarioEntity } from '../../../../../../domain/models/usuario.model';

@Component({
  selector: 'app-usuario-tabla',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './usuario-tabla.component.html',
  styleUrl: './usuario-tabla.component.scss'
})
export class UsuarioTablaComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({required: true}) usuarios!: UsuarioEntity[];
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  displayedColumns: string[] = ['id', 'username', 'equipoVenta', 'rol', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['usuarios']) {
      this.dataSource.data = this.usuarios;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editItemHandler(item: any) {
    this.editItem.emit(item);
  }

  deleteItemHandler(item: any) {
    this.deleteItem.emit(item);
  }

}
