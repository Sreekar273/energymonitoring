import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import {Chart} from 'chart.js'
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-user-energydata',
  templateUrl: './user-energydata.component.html',
  styleUrls: ['./user-energydata.component.css']
})
export class UserEnergydataComponent implements OnInit{

  date: string | undefined;

  sdate: string | undefined;
  edate: string | undefined;

  meter: string | undefined;
  model: string | undefined;

  currmonth: string | undefined;

  curryear: string | undefined;

  meterDisplay = false;
  zoneDisplay = false;
  zone_name : string | undefined;

  constructor(private http: HttpClient){}

  totalAngularPackages: any;

  //  startdate = document.getElementById('startdate');
  //  start = this.startdate?.getAttribute('value');
  //  enddate = document.getElementById('enddate');
  //  end = this.enddate?.getAttribute('value');
  //  daterange!: { startdate: Date; enddate: Date; };
  daterange: { sdate: string; edate: string; } | undefined;
  onSubmit(){
    console.log(this.sdate);
    console.log(this.edate);  
    console.log({sdate: this.sdate, edate: this.edate});
    // console.log(this.daterange);
    this.http.post<any>("http://127.0.0.1:5000/energyjson", {sdate: this.sdate, edate: this.edate, meter: this.meter, model: this.model, zoneDisplay: this.zoneDisplay, zone_name: this.zone_name})
      .subscribe((result)=>{
        // console.log(result);
        const newx: any[] = [];
        const newy: any[] = [];
        result.forEach((element: { x: any; y: any; })=>{
          newx.push(element.x);
          newy.push(element.y);
        });
        this.chart.config.data.labels = newx;
        this.chart.config.data.datasets[0].data = newy;
        console.log(newx);
        this.chart.update();   
      });  
  }

  onClickDay(){
    console.log(this.currmonth);
    this.http.post<any>("http://127.0.0.1:5000/energyjson", {currmonth: this.currmonth, meter: this.meter, model: this.model, zoneDisplay: this.zoneDisplay, zone_name: this.zone_name})
      .subscribe((result)=>{
        // console.log(result);
        const newmonthx: any[] = [];
        const newmonthy: any[] = [];
        result.forEach((element: { x: any; y: any; })=>{
          newmonthx.push(element.x);
          newmonthy.push(element.y);
        });
        this.chart.config.data.labels = newmonthx;
        this.chart.config.data.datasets[0].data = newmonthy;
        console.log(newmonthx);
        this.chart.update();   
      });  
  }

  onClickMonth(){
    console.log(this.curryear);
    this.http.post<any>("http://127.0.0.1:5000/energyjson", {curryear: this.curryear, meter: this.meter, model: this.model, zoneDisplay: this.zoneDisplay, zone_name: this.zone_name})
      .subscribe((result)=>{
        // console.log(result);
        const newyearx: any[] = [];
        const newyeary: any[] = [];
        result.forEach((element: { x: any; y: any; })=>{
          newyearx.push(element.x);
          newyeary.push(element.y);
        });
        this.chart.config.data.labels = newyearx;
        this.chart.config.data.datasets[0].data = newyeary;
        console.log(newyearx);
        this.chart.update();   
      }); 
  }

  onClick15(){
    console.log(this.date);
    this.http.post<any>("http://127.0.0.1:5000/energyjson", {date: this.date, meter: this.meter, model: this.model, zoneDisplay: this.zoneDisplay, zone_name: this.zone_name})
      .subscribe((result)=>{
        // console.log(result);
        const new15x: any[] = [];
        const new15y: any[] = [];
        result.forEach((element: { x: any; y: any; })=>{
          new15x.push(element.x);
          new15y.push(element.y);
        });
        this.chart.config.data.labels = new15x;
        this.chart.config.data.datasets[0].data = new15y;
        console.log(new15x);
        this.chart.update();   
      }); 
  }

  onClickMeter(){
    console.log(this.meter);
    this.http.post<any>("http://127.0.0.1:5000/energyjson", {meter: this.meter, model: this.model})
      .subscribe((result)=>{
        // console.log(result);
        const newx: any[] = [];
        const newy: any[] = [];
        result.forEach((element: { x: any; y: any; })=>{
          newx.push(element.x);
          newy.push(element.y);
        });
        this.chart.config.data.labels = newx;
        this.chart.config.data.datasets[0].data = newy;
        console.log(newx);
        this.chart.update();   
      }); 
  }

  toDisplay = false;
  toDisplay1 = false;
  toDisplay2 = false;
  toDisplay3 = false;
  toDisplay4 = true;

  toggleButton(){
    this.toDisplay = true;
    this.toDisplay1 = false;
    this.toDisplay2 = false;
    this.toDisplay3 = false;
    this.toDisplay4 = false;
  }

  toggleButton1(){
    this.toDisplay = false;
    this.toDisplay1 = true;
    this.toDisplay2 = false;
    this.toDisplay3 = false;
    this.toDisplay4 = false;
  }

  toggleButton2(){
    this.toDisplay = false;
    this.toDisplay2 = true;
    this.toDisplay1 = false;
    this.toDisplay3 = false;
    this.toDisplay4 = false;
  }

  toggleButton3(){
    this.toDisplay = false;
    this.toDisplay3 = true;
    this.toDisplay2 = false;
    this.toDisplay1 = false;
    this.toDisplay4 = false;
  }

  toggleMeter(){
    this.toDisplay = false;
    this.toDisplay1 = false;
    this.toDisplay2 = false;
    this.toDisplay3 = false;
    this.toDisplay4 = true;
    this.meterDisplay = true;
    this.zoneDisplay = false;
  }

  toggleZone(){
    this.toDisplay = false;
    this.toDisplay2 = false;
    this.toDisplay1 = false;
    this.toDisplay3 = false;
    this.toDisplay4 = false;
    this.meterDisplay = false;
    this.zoneDisplay = true;
  }


  ngOnInit() {
    // this.today = new Date().toISOString();
    // this.onSubmit();
    // Simple GET request with response type <any>
    this.http.get<any>('http://127.0.0.1:5000/energyjson').subscribe(data => {
      // console.log(data);
        this.totalAngularPackages = data;
        // console.log(this.totalAngularPackages);
    
    const energy: any[] = [];
    const ids: any[] = [];
    const times:any =[];
    const volt: any = [];
    const curr: any = [];
    const day: any = [];
    const sumday : any = [];
    const summonth : any = [];
    const sumyear: any = [];
    console.log(this.totalAngularPackages[0]._id);
    this.totalAngularPackages.forEach((element: { energy_kwh: any; _id: any; time: any; voltage: any; current:any; createdDate:any }) => {
      energy.push(element.energy_kwh);
      ids.push(element._id);
      // let dateObj = moment(""+ element._id).toDate().toLocaleString([],{hour:'
      times.push(element.time);
      volt.push(element.voltage);
      curr.push(element.current);
      // day.push({x: element.createdDate, y: })
    });
    // this.totalAngularPackages.forEach((element: { energy_kwh: any; createdDay: any })=>{
    //   if(element.createdDay){
    //     sumday.push(element.energy_kwh);
    //   }
    // });
    // console.log(sumday);
    console.log(energy[0]);
    const dates = ['2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06'];
    const datapoints = [2,5,7,9,11];
    // console.log(ids);
    this.ctx = document.getElementById('myChart');
    // this.ctx.config.data.labels = this.filterData(dates);
    // this.ctx.update();

    // console.log(this.totalAngularPackages.energy_kwh);
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        // labels: ['Energy(kwh)', 'Voltage', 'Current', 'Power_Factor', 'Frequency'],
        labels: times,
        // labels: this.totalAngularPackages[0].id,
        datasets: [{
          label: 'Energy Consumption',
          data: energy,
          // data: [260, 220, 12, 0.7, 100],
          borderWidth: 1,
          borderSkipped: false,
          yAxisID: 'y',
          order: 3,
        },
        {
          label: 'Voltage',
          data: volt,
          // data: [260, 220, 12, 0.7, 100],
          type: 'line',
          yAxisID: 'y',
          order: 2,
        },
        {
          label: 'Current',
          data: curr,
          // data: [260, 220, 12, 0.7, 100],
          type: 'line',
          yAxisID: 'amp',
          order: 1,
        }]
      },
      options: {
        scales: {
          x:{
            // type: 'time',
            // time: {
            //   unit: 'day',
            // },
            title:{
              display:true,
              text: 'Time (HH:MM)'
            }
          },
          y:{
            title:{
              display:true,
              text: 'Energy(kwh) and Voltage(V)'
            }
          },
          amp:{
            beginAtZero: true,
            type: 'linear',
            position: 'right',
            title:{
              display:true,
              text: 'Current(Amperes)'
            },
            grid:{
              display: false,
            }
          }
        },
      },
    });
    });
  }
  chart: any;

  ctx: any;

  dates: any;
  datapoints: any;
  filterData(dates:any){
    const dates2 = [...dates];
    console.log(dates2);
    const startdate = document.getElementById('startdate');
    const enddate = document.getElementById('enddate');
    // get index number in array
    const startindexdate = dates2.indexOf(startdate?.getAttribute('value'));
    const endindexdate = dates2.indexOf(enddate?.getAttribute('value'));
    // console.log(startdate?.getAttribute('value'));
    // console.log(startindexdate);

    // slice the array
    const filterDate = dates2.slice(startindexdate, startindexdate+1);

    return filterDate;
    //replace the labels
    // ctx.config.data.labels = filterDate;
    // ctx.update();
  }
  
}
