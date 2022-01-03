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
  profilePictureKey: string = "profilePicture";
  userNameKey: string = "userName";

  constructor(private http : HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) { }

  login(username:string, password:string, userRole:string){

    //interface can be made instead
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
      console.log(JSON.stringify(tokenkDetails) + "  tokenDetails");
      if(tokenValid){
        this.setAuth(tokenkDetails)
        this.setRole(tokenkDetails.role_name)
        this.setUserId(tokenkDetails.userId);
        this.setProfilePicture(tokenkDetails.profile_picture_path);
        this.setUser(tokenkDetails.user_name);
      }
      return tokenkDetails;
    }))
  }

  setAuth(auth : TokenResponse|null) : boolean {
    if(isPlatformBrowser(this.platformId)){
      if(auth){
        console.log(JSON.stringify(auth)+ " auth");
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

  getRole(){
    var result =  localStorage.getItem(this.roleKey);
    if(result == "Administartor")
    {
      return true;
    }
    else{
      return false;
    }
   
  }

  getTheRole(): boolean{
    var result =  localStorage.getItem(this.roleKey);
    if(result == "Administartor")
    {
      return true;
    }
    else{
      return false;
    }
  }

  setProfilePicture(profilePicture : string | null): boolean{
    if(isPlatformBrowser(this.platformId)){
      if(profilePicture){
        localStorage.setItem(
          this.profilePictureKey, profilePicture); 
      }
      else{
        localStorage.removeItem(this.profilePictureKey);
      }
      }
    return true;
  }
  getProfilePictute(){
    var result =  localStorage.getItem(this.profilePictureKey);
    if(result )
    {
      return result;
    }
    else{
        return "";
    }
   
  }

  setUser(userName: string | null): boolean{

    if(isPlatformBrowser(this.platformId)){
      if(userName){
        localStorage.setItem(
          this.userNameKey, userName); 
      }
      else{
        localStorage.removeItem(this.userNameKey);
      }
      }
    return true;
  
  }
  getUser(){
    var result =  localStorage.getItem(this.userNameKey);
    return result;
  }
  // isLoggedIn(): boolean{
  //   if(platformBrowser(this.platformId)){
  //     return localStorage.getItem(this.authKey) != null
  //   }
  //   return false;
  // }

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
