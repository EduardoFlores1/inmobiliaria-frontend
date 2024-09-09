import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { ClienteUseCaseService } from '../../../../../../domain/use-cases/cliente/cliente-use-case.service';
import { IDomainCliente } from '../../../../../../domain/models/cliente.model';
import { Subscription } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-clientes-circularchart',
  standalone: true,
  imports: [],
  templateUrl: './clientes-circularchart.component.html',
  styleUrl: './clientes-circularchart.component.scss'
})
export class ClientesCircularchartComponent {

  @ViewChild('myChartCanvas') canvasRef!: ElementRef;

  private _clientesService = inject(ClienteUseCaseService);
  private clientesList = signal<IDomainCliente[]>([]);
  private $sub : Subscription | undefined;

  a = signal<number>(0);
  b = signal<number>(0);
  c = signal<number>(0);
  d = signal<number>(0);

  public config: any = {
    type: 'doughnut',
    data: this.load(),
  }

  load() {
    const data = {
      labels: [
        'Interesado',
        'No interesado',
        'No contesto',
        'Numero Incorrecto'
      ],
      datasets: [{
        label: 'num',
        data: [1,2,3,4],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 32, 15)'
        ],
        hoverOffset: 4
      }]
    };
    return data;
  }


  loadCli() {
    this.$sub = this._clientesService.readAll().subscribe({
      next: (list) => {
        this.clientesList.set(list);

        const count = list.reduce((acc, item) => {
          if (item.tipoEstado === 'Interesado') {
            acc.a += 1;
          }
          if (item.tipoEstado === 'No interesado') {
            acc.b += 1;
          }
          if (item.tipoEstado === 'No contesto') {
            acc.c += 1;
          }
          if (item.tipoEstado === 'Numero Incorrecto') {
            acc.d += 1;
          }
          return acc;
        }, { a:0, b:0, c:0, d:0 });

        this.a.set(count.a)
        this.b.set(count.b)
        this.c.set(count.c)
        this.d.set(count.d)

      },
      error(err) {
        console.log();
      },
    });
  }
  chart: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadCli()
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, this.config);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$sub?.unsubscribe();
  }
}
