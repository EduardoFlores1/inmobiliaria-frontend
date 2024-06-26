import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EmpleadoEntity } from '../../../../../../domain/entities/empleado.entity';

@Component({
  selector: 'app-empleado-tabla',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './empleado-tabla.component.html',
  styleUrl: './empleado-tabla.component.scss'
})
export class EmpleadoTablaComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input({required: true}) empleados!: EmpleadoEntity[];
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['empleados']) {
      this.dataSource.data = this.empleados;
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
