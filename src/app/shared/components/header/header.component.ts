import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleTheSideBar: EventEmitter<any> = new EventEmitter();
  constructor(private authenticationService : AuthenticationService, 
    private router: Router) { }

  ngOnInit(): void {
  }
  toggleSideBar(){
    this.toggleTheSideBar.emit();
  }

  logout(){
    this.authenticationService.logout();
   // this.router.navigate["/home/login"]
    this.router.navigate(['login']);
  }
}
