import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  profilePicture : string ="";
  isRoleAdmin: boolean= false;
  roleName: string = "";
  userName: string= "";


  constructor(public authenticationService: AuthenticationService, private router: Router) { 

    
    this.profilePicture = authenticationService.getProfilePictute();
    this.isRoleAdmin = authenticationService.getRole();
    this.userName = authenticationService.getUser();
    alert(this.userName + "Auth User Name");
    
    if(this.isRoleAdmin)
    {
        this.roleName = "Administrator";
    }
    else
    {
      this.roleName ="User";
    }

    if(this.profilePicture == "")
    {
      this.profilePicture = "https://material.angular.io/assets/img/examples/shiba2.jpg";
    }
  }

  ngOnInit(): void {
  }
  onClick(){
    var id = this.authenticationService.getUserId();
    this.router.navigate(["/home/myLeaveList", id])
  }

  onClickMyProfile(){
    var id = this.authenticationService.getUserId();
    this.router.navigate(["/home/employeeDetails", id])
  }

}
