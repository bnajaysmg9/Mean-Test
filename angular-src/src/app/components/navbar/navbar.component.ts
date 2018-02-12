import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessage} from 'angular-flash-message';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService,private flashMessage:FlashMessage) { }

  ngOnInit() {
  }
onLogout(){
  this.authService.logOut();
this.flashMessage.success('you are logged out',{timeout:5000});
this.router.navigate(['/login']);
return false;
}
}
