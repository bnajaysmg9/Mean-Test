import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessage} from 'angular-flash-message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: String;
password: String;
  constructor(private authService:AuthService,private router:Router,private flashMessage:FlashMessage,private validateService: ValidateService) { }

  ngOnInit() {
  }

onLogin(){
  const user= {
    email: this.email,
    password: this.password
  }
  if(this.validateService.validateLogin(user)){
  this.authService.authenticateUser(user).subscribe(data=>{
    if(data.success)
    {
      this.authService.storeUserData(data.token,data.user);
      this.flashMessage.success('Successfully Logged In', {timeOut:3000});
      this.router.navigate(['dashboard']);
    }

    else
    {
      this.flashMessage.danger(data.msg,{timeout:5000});
      this.router.navigate(['login']);
    }

  });
}
else{
  this.flashMessage.danger('Please fill all details',{timeout:5000});
}
}
}
