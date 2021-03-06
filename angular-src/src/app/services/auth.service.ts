import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
authToken: any;
user: any;
  constructor(private http:Http) { }

authenticateUser(user){
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
  .map(res=>res.json());
}
storeUserData(token,user){
  localStorage.setItem('id_token',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authToken=token;
  this.user=user;
}

logOut(){
  localStorage.clear();
  this.authToken=null;
  this.user=null;
}

registerUser(user){
  let headers=new Headers();
  headers.append('Content-Type','application/json');
 return  this.http.post('http://localhost:3000/users/register',user,{headers:headers})
  .map(res=>res.json());
}
loadToken(){
const token=localStorage.getItem('id_token');
  this.authToken=token;
}
getProfile(){
  this.loadToken();
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Authorization',this.authToken);
 return  this.http.get('http://localhost:3000/users/profile',{headers:headers})
  .map(res=>res.json());
}
loggedIn(){
  return tokenNotExpired('id_token')
}
}
