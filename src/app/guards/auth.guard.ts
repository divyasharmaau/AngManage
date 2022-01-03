import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router :Router){}

    canActivate() {
      if(this.authenticationService.isLoggedIn())
      {
      return true;
      }
        this.router.navigate(['/login']);
        return false;
      
    }
    
}
