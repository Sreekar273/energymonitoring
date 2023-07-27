import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'admin-header',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    toggleSidebar(){
        this.toggleSidebarForMe.emit();
    }
}
