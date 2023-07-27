import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { User, RegUser } from './reg';
import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  // postId: any = {
  //   username: '',
  //   email: '',
  //   password: '',
  //   // cpass: ''
  // }

  // userModel = new User('r','','','');

  constructor(private http: HttpClient, private router: Router){}

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

    // ngOnInit(): void {
    //     throw new Error("Method not implemented.");
    // }

    toggleSidebar(){
        this.toggleSidebarForMe.emit();
    }
  // ngOnInit(){
  //   // Simple POST request with a JSON body and response type <any>
  //   // this.http.post<any>('http://127.0.0.1:5000/register', { title: 'Angular POST Request' })
  //   //   .subscribe(data => {
  //   //     // console.log(data);
  //   //     this.postId = data;
  //   //     // console.log(this.postId);
  //   // });

  // }
  
  onSubmit(data:{username: string, email: string, password: string, cpass: string}, path: string){

  //   alert('1');  FINAL
    // let queryParams = new HttpParams().append("username",data.username);
  //  console.log(data.username);
    this.router.navigate([path]);
    return this.http.post<any>("http://127.0.0.1:5000/register", data)
      .subscribe((result)=>{
       console.log(result);
    });
  }

  // clickButton(path:string){
  //   this.router.navigate([path]);
  // }

    // console.log(this.postId);
    // Simple POST request with a JSON body and response type <any>
    // this.http.post<any>('http://127.0.0.1:5000/register', data).subscribe(data1 => {
    //   this.postId = data.id;
    //   console.log(data1);
    // });


}

