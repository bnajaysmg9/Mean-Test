import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {FlashMessage} from 'angular-flash-message';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name: string;
email: string;
phone:string;
password:string;
  constructor(private authService:AuthService, private validateService:ValidateService,private router:Router,private flashMessage:FlashMessage) { }

  ngOnInit() {
  }
onRegister(){
  let newUser={
    name:this.name,
    email:this.email,
    phone:this.phone,
    password:this.password
  }

  if(this.validateService.validateRegister(newUser)){
    if(this.validateService.validateEmail(newUser.email)){
    this.authService.registerUser(newUser).subscribe(data=>{
      if(data.success)
      {
        this.flashMessage.success(data.msg,{timeOut:5000});
        this.router.navigate(['login']);
      }
      else{
          this.flashMessage.danger(data.msg,{timeOut:5000});
          this.router.navigate(['register']);
      }
    });
  }
  else{
    this.flashMessage.danger('Please validateEmail', {timeOut:5000});
    return false;
  }
}

  else{
    this.flashMessage.danger('Please fill all fields', {timeOut:5000});
    //this.router.navigate(['/login']);
  }
}
}
