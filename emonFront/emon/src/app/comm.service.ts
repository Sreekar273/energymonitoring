import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { UserData } from './admin/user-details/userdet';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  url = 'http://127.0.0.1:5000/userjson';

  constructor(private http: HttpClient) { }

  // getdetails() : Observable<UserData[]>{
  //   return this.http.get<UserData[]>(this.url)
  //     .pipe(tap((response:Response) => response.json));
  // }

  getdetails(): Observable<UserData[]>{
    return this.http.get<UserData[]>(this.url)
                    .pipe(tap(data => alert(JSON.stringify(data))));
  }

  getData() {
    // now returns an Observable of Config
    return this.http.get<UserData>(this.url);
  }

  getConfig() {
    return this.http.get<UserData>(this.url);
  }

  getConfigResponse(): Observable<HttpResponse<UserData>> {
    return this.http.get<UserData>(
      this.url, { observe: 'response' });
  }

  // public getdetails(): Observable<UserData[]> {
  //   return this.http.get<UserData[]>(
  //     `${this.url}`
  //   );
  // }

}
