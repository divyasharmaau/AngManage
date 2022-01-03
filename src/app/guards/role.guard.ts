import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router : Router, private authenticationService: AuthenticationService){}

  canActivate(){
   let role = this.authenticationService.getRole();
    if(role)
    {
      return true;
    }
    else
    {
      alert("You do not have acces to this page");
      this.router.navigate(['home']);
       return false;
    }
  }

}
