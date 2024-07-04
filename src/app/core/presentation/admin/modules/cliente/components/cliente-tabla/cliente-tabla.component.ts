import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IDomainCliente } from '../../../../../../domain/models/cliente.model';

@Component({
  selector: 'app-cliente-tabla',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './cliente-tabla.component.html',
  styleUrl: './cliente-tabla.component.scss'
})
export class ClienteTablaComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({required: true}) clientes!: IDomainCliente[];
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'telefono', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['clientes']) {
      this.dataSource.data = this.clientes;
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
