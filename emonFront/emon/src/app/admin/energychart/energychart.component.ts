import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-energychart',
  templateUrl: './energychart.component.html',
  styleUrls: ['./energychart.component.css']
})
export class EnergychartComponent implements OnInit{
  ngOnInit(){

    this.ctx = document.getElementById('myChart');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
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


}
