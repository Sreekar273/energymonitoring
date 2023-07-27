import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommService } from '../comm.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Auth } from 'mongodb';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  // baseURL = 'http://localhost:5000/login';
  baseUrl = 'http://13.233.29.211/login'

  constructor(private http: HttpClient, private router: Router, private auth: AuthService){}

  loginUser(): void{
    this.auth.login().then(()=>{
      this.router.navigate(['/dashboard/:id']);
    });
  }

  onSubmit(data:{username: string, email: string, password: string, cpass: string}, path: string){

  //   alert('1');  FINAL
    // let queryParams = new HttpParams().append("username",data.username);
   console.log(data.username);
  // this.router.navigate([path]);
    return this.http.post<any>("http://127.0.0.1:5000/login", data)
      .subscribe((result)=>{
        console.log(result);

        if(result){
          // this.router.navigate([path]);
          this.loginUser();
        }
        else{
          alert('Incorrect username or password');
        }
    });
    // this.http.get<any>("http://127.0.0.1:5000/login", data).subscribe({

    // })
  }

  // ngOnInit(){
  //   // this.loginData = this.service.getData();
  // }

  // public getJsonValue: any;
  // public postJsonValue: any;

  // constructor(private http: HttpClient){
  //   // logindata(){
  //   //   return this.http.get(this.baseURL);
  //   // }
  //   this.getMethod();
  // }

}
