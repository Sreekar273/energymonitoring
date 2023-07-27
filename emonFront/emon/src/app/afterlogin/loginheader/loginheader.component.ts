import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'login-header',
  templateUrl: './loginheader.component.html',
  styleUrls: ['./loginheader.component.css']
})
export class LoginheaderComponent implements OnInit{
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    toggleSidebar(){
        this.toggleSidebarForMe.emit();
    }
}
