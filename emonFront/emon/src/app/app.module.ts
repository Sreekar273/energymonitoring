import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComp } from './header/header.component';
import { BodyComp } from './body/body.component';
import { BodyheaderComponent } from './beforelogin/bodyheader/bodyheader.component';
import { Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommService } from "./comm.service";
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

const routes:Routes = [
  {path:'', component : BodyheaderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'dashboard/:id', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'userjson', component: UserDetailsComponent},
  {path: 'energyjson', component: UserEnergydataComponent, canActivate: [authGuard]},
  {path: 'meterjson', component: UserMeterdataComponent},
  {path: 'reg', component: RegComponent},
  {path: 'welcome', component: BodyheaderComponent},
  {path: 'loggedin', component: AfterloginComponent},
  {path: 'chart', component: ChartComponent},
  {path: 'energychart', component: EnergychartComponent, canActivate: [authGuard]},
  {path: 'editmeters', component:EditmeterdataComponent, canActivate: [authGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComp,
    BodyComp,
    BodyheaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserDetailsComponent,
    UserEnergydataComponent,
    UserMeterdataComponent,
    SidenavComponent,
    RegComponent,
    AfterloginComponent,
    BeforeloginComponent,
    LoginheaderComponent,
    DashboardComponent,
    SidebarComponent,
    NewheaderComponent,
    AdminheaderComponent,
    ChartComponent,
    AdminsidebarComponent,
    EditmeterdataComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    NgChartsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [CommService],
  bootstrap: [AppComponent]
})
export class AppModule { }import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginHeaderComponent } from './login/login-header/login-header.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { UserEnergydataComponent } from './admin/user-energydata/user-energydata.component';
import { UserMeterdataComponent } from './admin/user-meterdata/user-meterdata.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegComponent } from './reg/reg.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { BeforeloginComponent } from './beforelogin/beforelogin.component';
import { LoginheaderComponent } from './afterlogin/loginheader/loginheader.component';
import { DashboardComponent } from './afterlogin/dashboard/dashboard.component';
import { SidebarComponent } from './afterlogin/sidebar/sidebar.component';
import { NewheaderComponent } from './beforelogin/newheader/newheader.component';
import { AdminheaderComponent } from './admin/adminheader/adminheader.component';
import { ChartComponent } from './afterlogin/chart/chart.component';
import { EnergychartComponent } from './admin/energychart/energychart.component';
import { NgChartsModule } from 'ng2-charts';
import { authGuard } from './auth.guard';
import { AdminsidebarComponent } from './admin/adminsidebar/adminsidebar.component';
import { EditmeterdataComponent } from './admin/editmeterdata/editmeterdata.component';

