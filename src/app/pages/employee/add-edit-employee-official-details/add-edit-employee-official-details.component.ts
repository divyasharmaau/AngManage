import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BaseErrorFormComponent } from 'src/app/shared/baseErrorFormComponent';


import { Employee } from '../interfaces/employee';
import { EmployeePersonalDetails } from '../interfaces/employeePersonalDetails';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-add-edit-employee-official-details',
  templateUrl: './add-edit-employee-official-details.component.html',
  styleUrls: ['./add-edit-employee-official-details.component.css']
})

  export class AddEditEmployeeOfficialDetailsComponent  extends BaseErrorFormComponent  implements OnInit {

    form: FormGroup;
    employee : Employee = <Employee>{};
    workDays : number;
    workHours: number;
    employeeCreated: boolean = false;
    editMode : boolean = false;
    editPassword: boolean = false;
    hidden: boolean = true;
    formTitle : string;
    successMessage : string;
    @ViewChild("daysWorkedInWeek") daysWorkedInWeek: ElementRef;
    @ViewChild("numberOfHoursWorkedPerDay") numberOfHoursWorkedPerDay : ElementRef
    numRegex = /^-?\d*[.,]?\d{0,2}$/;
    
    employeePersonalDetails = <EmployeePersonalDetails>{};
    profilePhoto :string= "";

   //dept: Department[];
  
  
    constructor(private fb: FormBuilder, private http: HttpClient
               ,private employeeService : EmployeeService
               ,private route : ActivatedRoute
               ) { 
  
                super();

                // validator : this.customErrorVaidation.passwordMatchValidator(
                //   "password",
                //   "confirmPassword");
                this.createForm();
                //get the value of the id
                var id = this.route.snapshot.paramMap.get('id');
         
                if(id){
                  this.editMode = true;
                  this.hidden = true;
                  this.formTitle = "Edit Employee Official Details";
                  this.successMessage ="Employee has been Updated";
         
                  //to pre fill the form with values from database for edit 
                  this.employeeService.getEmployeeOfficialDetails(id)
                  .subscribe(data => {
                    this.employee = data;
                    this.profilePhoto = this.photoPath(this.employee);
                    this.getFormContent();
                  });
                }else{
           
                  this.editMode = false;
                  this.hidden = false;
                  this.formTitle = "Create Employee Official Details";
                  this.successMessage = "Employee has been Created";
                }
               }

       

    ngOnInit(): void {
    }

    photoPath(employee: Employee): string {

      if(!employee.employeePersonalDetails)
      {
        return "/assets/img/avatar.png";
      }

      if(!employee.employeePersonalDetails.photoPath)
      {
        return "/assets/img/avatar.png";
      }

      return employee.employeePersonalDetails.photoPath;
    }  


    //Match the padssword and Confirm password
    onPasswordChange(){
      if (this.confirmPassword.value == this.password.value) {
        this.confirmPassword.setErrors(null);
      } else {
        this.confirmPassword.setErrors({ mismatch: true });
      }
    }
    
    // getting the form control elements
    get password(): AbstractControl {
      return this.form.controls['password'];
    }
    
    get confirmPassword(): AbstractControl {
      return this.form.controls['confirmPassword'];
    }


    createForm(){
      this.form = this.fb.group({
        "title": ['',Validators.required],
        "firstName": ['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
        "middleName": [''],
        "lastName": ['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
        "userName": ['',Validators.required],
        "jobTitle": ['',Validators.required],
        "status": ['',Validators.required],
        "joiningDate": ['',Validators.required],
        "daysWorkedInWeek": ['',[Validators.required, Validators.pattern(this.numRegex)]],
        "numberOfHoursWorkedPerDay": ['',[Validators.required, Validators.pattern(this.numRegex)]],
        "manager": ['',Validators.required],
        // "email": ['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*") ]],
        "email": ['',[Validators.required,Validators.pattern('^.+@gmail.com$')]],
        "departmentId": ['',Validators.required],
        "password": ['',[Validators.required,Validators.minLength(8),Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}') ]],
        "confirmPassword":['']
      });


   
      
    // createForm(){
    //   this.form = this.fb.group({
    //     "title": [''],
    //     "firstName": [''],
    //     "middleName": [''],
    //     "lastName": [''],
    //     "userName": [''],
    //     "jobTitle": [''],
    //     "status": [''],
    //     "joiningDate": [''],
    //     "daysWorkedInWeek": [''],
    //     "numberOfHoursWorkedPerDay": [''],
    //     "manager": [''],
    //     // "email": ['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*") ]],
    //     "email": ['',[Validators.required,Validators.pattern('^.+@gmail.com$')]],
    //     "departmentId": [''],
    //     "password": [''],
    //     "confirmPassword":['']
    //   });
    }
  
    onSubmit(){
      if(this.editMode){
        this.employee = <Employee>{
          id: this.employee.id,
          title: this.form.value.title,
          firstName: this.form.value.firstName,
          middleName: this.form.value.middleName,
          lastName: this.form.value.lastName,
          userName: this.form.value.userName,
          email: this.form.value.email,
          joiningDate: this.form.value.joiningDate,
          jobTitle: this.form.value.jobTitle,
          status: this.form.value.status,
          daysWorkedInWeek: this.daysWorkedInWeek.nativeElement.value,
          numberOfHoursWorkedPerDay: this.numberOfHoursWorkedPerDay.nativeElement.value,
          departmentId: this.form.value.departmentId,
          manager: this.form.value.manager
      }
  
      this.employeeService.editEmployee(this.employee.id , this.employee)
      .subscribe(x => {
         this.employeeCreated = true;
      });
    }
      else
      {
        //create
        this.employee = <Employee>{
          id: "00000000-0000-0000-0000-000000000000",
          title: this.form.value.title,
          firstName: this.form.value.firstName,
          middleName: this.form.value.middleName,
          lastName: this.form.value.lastName,
          userName: this.form.value.userName,
          email: this.form.value.email,
          joiningDate: this.form.value.joiningDate,
          jobTitle: this.form.value.jobTitle,
          status: this.form.value.status,
          daysWorkedInWeek: this.daysWorkedInWeek.nativeElement.value,
          numberOfHoursWorkedPerDay: this.numberOfHoursWorkedPerDay.nativeElement.value,
          departmentId: this.form.value.departmentId,
          manager: this.form.value.manager,
          password: this.form.value.password,
          confirmPassword: this.form.value.confirmPassword
        }
  
      this.employeeService.createEmployee(this.employee)
      .subscribe(x =>{
        this.employeeCreated = true;
      })
    }
    }
  
  
  
    getFormContent(){
      this.form.setValue({
      title : this.employee.title || '',
      firstName : this.employee.firstName || '',
      middleName: this.employee.middleName || '     ',
      lastName: this.employee.lastName || '',
      userName:  this.employee.userName || '',
      email:  this.employee.email || '',
      jobTitle:  this.employee.jobTitle || '',
      status:  this.employee.status || '',
      joiningDate: moment(this.employee.joiningDate).format('YYYY-MM-DD'),
      daysWorkedInWeek:  this.employee.daysWorkedInWeek || '',
      numberOfHoursWorkedPerDay:  this.employee.numberOfHoursWorkedPerDay || '',
      manager:  this.employee.manager || '',
      departmentId:  this.employee.departmentId || '',
      password: this.employee.password || '',
      confirmPassword : this.employee.confirmPassword || ''
    
    })
    }
    
    onSelectStatus(event:any){
      if(this.form.value.status == "Full-Time"){
        this.daysWorkedInWeek.nativeElement.value = 5;
        this.numberOfHoursWorkedPerDay.nativeElement.value = 7.6;
      }
      else
      {
        this.daysWorkedInWeek.nativeElement.value = 0;
        this.numberOfHoursWorkedPerDay.nativeElement.value = 0;
      }
    }
  
    isReadOnly(){
      if(this.form.value.status == "Full-Time"){
        return true;
      }
      else
      {
        return false;
      }
    }
  
  }
  


