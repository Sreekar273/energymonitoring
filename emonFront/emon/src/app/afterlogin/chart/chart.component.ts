import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  // title = 'ng2-charts-demo';

  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  //   datasets: [
  //     { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
  //     { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  //   ]
  // };

  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: false,
  // };

  ngOnInit(){

    this.ctx = document.getElementById('myChart');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          // data: [12, 19, 3, 5, 2, 3],
          data: [
            [0,18],
            [1,10],
            [2,15],
            [3,25],
            [4,12],
            [5,1],
          ],
          borderWidth: 1,
          borderSkipped: false,
        }]
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true
      //     }
      //   }
      // }
    });
  }

  chart: any;

  ctx: any;

  constructor() {
  }
}
