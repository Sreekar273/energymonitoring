import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-user-meterdata',
  templateUrl: './user-meterdata.component.html',
  styleUrls: ['./user-meterdata.component.css']
})
export class UserMeterdataComponent implements OnInit{
  constructor(private http: HttpClient){}

  totalAngularPackages: any;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http.get<any>('http://127.0.0.1:5000/meterjson').subscribe(data => {
      // console.log(data);
        this.totalAngularPackages = data;
        // console.log(this.totalAngularPackages);
    });

    // console.log(this.totalAngularPackages);
  }
}
