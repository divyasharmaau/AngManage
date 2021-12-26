import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { map} from 'rxjs/operators';
import { platformBrowser } from '@angular/platform-browser';
import { TokenResponse } from './interfaces/tokenResponse';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  client_id: string = "Manage";
  authKey: string = "auth";
  roleKey: string ="role";

  userKey: string ="userId";

  constructor(private http : HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) { }

  login(username:string, password:string, userRole:string){

    var data = {
      username: username,
      password: password,
      role_name: userRole,
      grant_type: "password",
      client_id: this.client_id

    };
    return this.http.post<TokenResponse>("https://localhost:44330/api/account/auth/", data)
    .pipe(map(tokenkDetails =>{
      let tokenValid = tokenkDetails && tokenkDetails.token;
      if(tokenValid){
        this.setAuth(tokenkDetails)
        this.setRole(tokenkDetails.role_name)
    
        this.setUserId(tokenkDetails.userId);
      }
      return tokenkDetails;
    }))
  }

  setAuth(auth : TokenResponse|null) : boolean {
    if(isPlatformBrowser(this.platformId)){
      if(auth){
        localStorage.setItem(
          this.authKey, JSON.stringify(auth));
        }
          else
          {
            localStorage.removeItem(this.authKey);
          }
    };
    return true;
  }

  setRole(roleName: string | null): boolean{
    if(isPlatformBrowser(this.platformId)){
      if(roleName){
        localStorage.setItem(
          this.roleKey, roleName); 
      }
      else{
        localStorage.removeItem(this.roleKey);
      }
        
      }
    return true;

  }

  isLoggedIn(): boolean{
    if(platformBrowser(this.platformId)){
      return localStorage.getItem(this.authKey) != null
    }
    return false;
  }

  logout(): boolean{
    this.setAuth(null)
    return true;
  }


  setUserId(userId: string){
    if(isPlatformBrowser(this.platformId)){
      if(userId){

        localStorage.setItem(
          this.userKey, userId); 
      }
      else{
        localStorage.removeItem(this.userKey);
      }
        
      }
  }

  getUserId(){
    var result =  localStorage.getItem(this.userKey);
    return result;
  }
}
