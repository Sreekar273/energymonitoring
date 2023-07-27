import { Component, OnInit } from '@angular/core';
import { UserData } from './userdet';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { CommService } from '../../comm.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  constructor(private http: HttpClient){}

  totalAngularPackages: any;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http.get<any>('http://13.233.29.211/userjson').subscribe(data => {
      // console.log(data);
        this.totalAngularPackages = data;
        // console.log(this.totalAngularPackages);
    });

    // console.log(this.totalAngularPackages);
  }

  // params = this.param.password;

}
