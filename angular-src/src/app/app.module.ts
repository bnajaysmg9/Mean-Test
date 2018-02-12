import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http} from '@angular/http';
import {AuthService} from './services/auth.service';
import {ValidateService} from './services/validate.service';
import { HttpModule } from '@angular/http';
import {AuthGuard} from './guards/auth.guard';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {FlashMessageModule} from 'angular-flash-message';

const appRoutes:Routes=[
  {path:'', component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FlashMessageModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService,ValidateService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
