import { Component, OnInit } from '@angular/core';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'emon';

  sideBarOpen = true;

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  showHeader = true;
  showSidebar = false;

  constructor(private auth: AuthService){}
  ngOnInit(): void {
    // localStorage.getItem('loggedIn');
    if (localStorage.getItem("loggedIn")){
      this.showSidebar = true;
    }
  }

  // this.auth.isLoggedIn()
  

}


