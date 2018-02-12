import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:AuthService) { }
  user: object;
  ngOnInit() {
    this.authService.getProfile().subscribe(profile=>{
      this.user=profile.user;
    },
      err=>{
      console.log(err);
      return false;
    });
    }
  }
