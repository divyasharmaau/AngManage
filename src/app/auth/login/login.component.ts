import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb : FormBuilder, 
    private authenticationService : AuthenticationService, 
    private router: Router) {
     this.form = this.fb.group({
        email : ['', Validators.required],
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
        alert("app checking");
        this.router.navigate(['home'])
        this.router.navigate(['home'])
      })
	 
  }
  changeRole(e: any){
    this.selectRole()?.setValue(e.target.value,{
      onlySelf: true
    })
  }

  selectRole(){
    return this.form.get('userRole');
  }
}
