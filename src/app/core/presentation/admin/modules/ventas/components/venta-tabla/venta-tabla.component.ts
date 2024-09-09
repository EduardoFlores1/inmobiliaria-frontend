import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IDomainCliente } from '../../../../../../domain/models/cliente.model';
import { IDomainVenta } from '../../../../../../domain/models/venta.model';

@Component({
  selector: 'app-venta-tabla',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './venta-tabla.component.html',
  styleUrl: './venta-tabla.component.scss'
})
export class VentaTablaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({required: true}) ventas!: IDomainVenta[];
  @Output() editItem = new EventEmitter();

  displayedColumns: string[] = ['id', 'vendedor', 'cliente', 'telefono', 'manzana', 'precio', 'tipoPago', 'acciones'];
  dataSource = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['ventas']) {
      this.dataSource.data = this.ventas;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editItemHandler(item: any) {
    this.editItem.emit(item);
  }
}
