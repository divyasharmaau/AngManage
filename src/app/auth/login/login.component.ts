import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { BaseErrorFormComponent } from 'src/app/shared/baseErrorFormComponent';

import { AuthenticationService } from '../authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent extends BaseErrorFormComponent implements OnInit {

  form: FormGroup;
  emailPattern= "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(mail)\.com$";


  constructor(private fb : FormBuilder, 
    private authenticationService : AuthenticationService, 
    private router: Router) {

      super();
 
   
     this.form = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        password:  ['', Validators.required],
        userRole : ['', Validators.required]
      })
   }
 
  ngOnInit(): void {
  }
  onSubmit(){
    var username = this.form.value.email;
    var password = this.form.value.password;
    var userRole = this.form.value.userRole;
  this.authenticationService.login(username,password,userRole)
      .pipe(first())
      .subscribe(data =>{
          this.router.navigate(['home'])
      })
  }

  changeRole(e: any){
  
    this.selectRole().setValue(e.target.value,{
         //only if this value is true the form will be submitted
         onlySelf: true})
         alert(e.target.value + "e.target.value");
        
  }

  selectRole(){
   alert(this.form.get('userRole'));
    return this.form.get('userRole');
  }
  onSubmitDemoAdmin(){
    var username = "demoasadmn@gmail.com";
    var password = "Password1!";
    var userRole = "Administrator";
  this.authenticationService.login(username,password,userRole)
      .pipe(first())
      .subscribe(data =>{
        this.router.navigate(['home'])
      })
  }

  onSubmitDemoUser(){
    var username = "ariyabishop@mail.com";
    var password = "Password1!";
    var userRole = "Registered User";
  this.authenticationService.login(username,password,userRole)
      .pipe(first())
      .subscribe(data =>{
        this.router.navigate(['home'])
      })
  }
}


