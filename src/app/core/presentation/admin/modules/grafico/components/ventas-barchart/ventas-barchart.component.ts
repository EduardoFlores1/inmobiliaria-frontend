import { Component, ElementRef, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-ventas-barchart',
  standalone: true,
  imports: [],
  templateUrl: './ventas-barchart.component.html',
  styleUrl: './ventas-barchart.component.scss',
})
export class VentasBarchartComponent {

  @ViewChild('myChartCanvas') canvasRef!: ElementRef;

  public config: any = {
    type: 'bar',
    data: this.load(),
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  load() {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Ventas Mensuales',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }

  chart: any;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, this.config);
  }


}
