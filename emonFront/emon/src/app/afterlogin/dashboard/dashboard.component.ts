import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router){}
  
  sideBarOpen = true;

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  // boxes = "";
  // howmany!: number;
  // quant! : string | null ;

  // onChange = () => {
  //   this.quant = document.getElementById("howmany")!.getAttribute('value');
  //   this.howmany = parseInt(this.quant);
  //   for(let i=0;i<this.howmany;i++) {
  //     this.boxes += '<b>File ' + i + '</b>: <input type="file" id="box' + i + ' name="box' + i + ' /><br/>';
  //   }
  //   console.log(this.boxes);
  //   document.getElementById("boxquantity")!.innerHTML = this.boxes;
  // }

  logout(){
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
