import { Component, inject, signal } from '@angular/core';
import { ClientesCircularchartComponent } from './components/clientes-circularchart/clientes-circularchart.component';

import {MatCardModule} from '@angular/material/card';
import { VentasBarchartComponent } from './components/ventas-barchart/ventas-barchart.component';
import { IDomainVenta } from '../../../../domain/models/venta.model';
import { Subscription } from 'rxjs';
import { VentaUseCaseService } from '../../../../domain/use-cases/venta/venta-use-case.service';
import { ClienteUseCaseService } from '../../../../domain/use-cases/cliente/cliente-use-case.service';
import { IDomainCliente } from '../../../../domain/models/cliente.model';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [
    ClientesCircularchartComponent,
    VentasBarchartComponent,
    MatCardModule
  ],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.scss'
})
export default class GraficoComponent {

  private _ventasService = inject(VentaUseCaseService);
  private _clientesService = inject(ClienteUseCaseService);
  private ventasList = signal<IDomainVenta[]>([]);
  private clientesList = signal<IDomainCliente[]>([]);

  totalVentas = signal<number | null>(null);
  totalContado = signal<number | null>(null);
  totalCredito = signal<number | null>(null);
  totalClientes = signal<number | null>(null);

  private $sub = new Subscription;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.traerClientes();
    this.traerVentas();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$sub?.unsubscribe();
  }

  traerVentas() {
    this.$sub.add(
      this._ventasService.readAll().subscribe({
        next: (list) => {
          this.ventasList.set(list);
          this.totalVentas.set(list.length);

          const count = list.reduce((acc, item) => {
            if (item.tipoLote.tipoPago === 'Contado') {
              acc.trueCount += 1;
            } else {
              acc.falseCount += 1;
            }
            return acc;
          }, { trueCount: 0, falseCount: 0 });

          this.totalContado.set(count.trueCount);

          this.totalCredito.set(count.falseCount);

        },
        error(err) {
          console.log();
        },
      })
    );
  }

  traerClientes() {
    this.$sub.add(
      this._clientesService.readAll().subscribe({
        next: (list) => {
          this.clientesList.set(list);
          this.totalClientes.set(list.length)
        },
        error(err) {
          console.log();
        },
      })
    );
  }



}
