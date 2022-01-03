import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BaseErrorFormComponent } from '../baseErrorFormComponent';
import { Employee } from '../interfaces/employee';
import { EmployeePersonalDetails } from '../interfaces/employeePersonalDetails';

import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-edit-employee-personal-details',
  templateUrl: './add-edit-employee-personal-details.component.html',
  styleUrls: ['./add-edit-employee-personal-details.component.css']
})



export class AddEditEmployeePersonalDetailsComponent extends BaseErrorFormComponent implements OnInit {
  
  form: FormGroup;
  employee : Employee;
    workDays : number;
    workHours: number;
    employeeCreated: boolean = false;
    editMode : boolean = false;
    editPassword: boolean = false;
    hidden: boolean = true;
    formTitle : string;
    successMessage : string;
    employeeId : string;
    @ViewChild("myNameElem") myNameElem: ElementRef;
  selectedFile: File;
  url: any;


  employeeCreatedOrUpdated: boolean = false;
 // employeePersonalDetails: EmployeePersonalDetails;
   employeePersonalDetails = <EmployeePersonalDetails>{};



  empOfficialDetails: Employee;
  photoPath: string;
 
  constructor(private fb: FormBuilder, private employeeService : EmployeeService 
    ,private route : ActivatedRoute) {
      super();
      var id = this.route.snapshot.paramMap.get('id');
      this.employeeId = id;

   
     this.employeeId = id;

            this.employeeService.getEmployeeOfficialDetails(this.employeeId)
          .subscribe(data =>{
            this.empOfficialDetails = data;

          if(this.empOfficialDetails.employeePersonalDetails == null){
   
         this.createForm();
            this.formTitle ="Add Employee Personal Details";
            this.successMessage = "Employee Personal Details Added";
           //this.employeeCreatedOrUpdated = true;
          }
          else{
            this.editMode = true;
            this.createForm();
              this.getFormContent();
              this.formTitle ="Edit Personal Details";
              this.successMessage = "Employee Personal Details have been updated";
          }
          
  })
    }


  ngOnInit(): void {
   
  }
  
 
  
  createForm(){
    this.form = this.fb.group({
      "fullName": [this.empOfficialDetails.firstName + " " +this.empOfficialDetails.lastName],
      "photo": [''],
    // "photoPath":[''],
      "dateOfBirth": ['',Validators.required],
      "nationality": [''],
     // "bloodGroup": [''],
      "maritalStatus": [''],
      "gender": [''],
      "bankName": [''],
      "branch": [''],
      "accountName": [''],
      "bsb": [''],
      "accountNumber": [''],
      
      "houseNumber": [''],
      "street": [''],
      "city": [''],
      "state": [''],
      "country":[''],
      "zipCode": [''],

      "emergencyContact":[''],
      "relationship": [''],
      "emergencyContactPhoneNumber": [''],
      "emergencyContactHouseNumber": [''],
      "emergencyContactStreet": [''],
      "emergencyContactCity": [''],
      "emergencyContactState": [''],
      "emergencyContactCountry": [''],
      "emergencyContactZipCode": [''],
      //"photoPath":['']
    });
  }

  getFormContent(){

 
    this.form.setValue({ 
      //id : this.empOfficialDetails.employeePersonalDetails.id,
      fullName: this.empOfficialDetails.firstName +" "+ this.empOfficialDetails.lastName  || '',
      photo:this.empOfficialDetails.employeePersonalDetails.photo || '',
      //photoPath : this.empOfficialDetails.employeePersonalDetails.photoPath || '',
         nationality: this.empOfficialDetails.employeePersonalDetails.nationality || '',
    //  bloodGroup: this.empOfficialDetails.employeePersonalDetails.bloodGroup || '',
      maritalStatus: this.empOfficialDetails.employeePersonalDetails.maritalStatus || '',
      gender: this.empOfficialDetails.employeePersonalDetails.gender || '',

      bankName: this.empOfficialDetails.employeePersonalDetails.bankName || '',
      branch: this.empOfficialDetails.employeePersonalDetails.branch  || '',
      accountName: this.empOfficialDetails.employeePersonalDetails.accountName ||'',
      bsb: this.empOfficialDetails.employeePersonalDetails.bsb || '',
      accountNumber: this.empOfficialDetails.employeePersonalDetails.accountNumber || '',

      houseNumber: this.empOfficialDetails.employeePersonalDetails.houseNumber || '',
      street: this.empOfficialDetails.employeePersonalDetails.street || '',
      city: this.empOfficialDetails.employeePersonalDetails.city || '',
      state: this.empOfficialDetails.employeePersonalDetails.state || '',
      country: this.empOfficialDetails.employeePersonalDetails.country ||'',
      zipCode: this.empOfficialDetails.employeePersonalDetails.zipCode || '',

      relationship: this.empOfficialDetails.employeePersonalDetails.relationship || '',
      emergencyContact: this.empOfficialDetails.employeePersonalDetails.emergencyContact || '',
      emergencyContactPhoneNumber: this.empOfficialDetails.employeePersonalDetails.emergencyContactPhoneNumber || '',
      emergencyContactHouseNumber: this.empOfficialDetails.employeePersonalDetails.emergencyContactHouseNumber || '',
      emergencyContactStreet: this.empOfficialDetails.employeePersonalDetails.emergencyContactStreet || '',
      emergencyContactCity: this.empOfficialDetails.employeePersonalDetails.emergencyContactCity || '',
      emergencyContactState: this.empOfficialDetails.employeePersonalDetails.emergencyContactState || '',
      emergencyContactCountry: this.empOfficialDetails.employeePersonalDetails.emergencyContactCountry || '',
      emergencyContactZipCode: this.empOfficialDetails.employeePersonalDetails.emergencyContactZipCode || '',
      

      dateOfBirth : moment(this.empOfficialDetails.employeePersonalDetails.dateOfBirth).format('YYYY-MM-DD'),

    })

  }




 
  onSubmit(){
    if(this.editMode){
      const formData = new FormData();
      formData.append('id', this.employeeId);
      formData.append('fullName', this.form.value.fullName);
      formData.append('photo', this.selectedFile);
    // formData.append('photoPath', this.form.value.photoPath2);
      formData.append('dateOfBirth', this.form.value.dateOfBirth);
      formData.append('nationality', this.form.value.nationality);
      //formData.append('bloodGroup', this.form.value.bloodGroup);
      formData.append('maritalStatus', this.form.value.maritalStatus);
      formData.append('gender', this.form.value.gender);
    
      formData.append('bankName', this.form.value.bankName);
      formData.append('branch', this.form.value.branch);
      formData.append('accountName', this.form.value.accountName);
      formData.append('bsb', this.form.value.bsb);
      formData.append('accountNumber',this.form.value.accountNumber);
    
      formData.append('houseNumber', this.form.value.houseNumber);
      formData.append('street', this.form.value.street);
      formData.append('city', this.form.value.city);
      formData.append('state', this.form.value.state);
      formData.append('country', this.form.value.country);
      formData.append('zipCode', this.form.value.zipCode);
    
      formData.append('emergencyContact', this.form.value.emergencyContact);
      formData.append('relationship', this.form.value.relationship);
      formData.append('emergencyContactPhoneNumber', this.form.value.emergencyContactPhoneNumber);
      formData.append('emergencyContactHouseNumber', this.form.value.emergencyContactHouseNumber,);
      formData.append('emergencyContactStreet', this.form.value.emergencyContactStreet,);
      formData.append('emergencyContactCity', this.form.value.emergencyContactCity,);
      formData.append('emergencyContactState', this.form.value.emergencyContactState,);
      formData.append('emergencyContactCountry', this.form.value.emergencyContactCountry,);
      formData.append('emergencyContactZipCode', this.form.value.emergencyContactZipCode);
  
      this.employeeService.editEmployeePersonalDetails(this.employeeId , formData)
      .subscribe(data =>{
        this. employeePersonalDetails =data;
        this.employeeCreatedOrUpdated = true;
      })
    }
    else
    {
      const formData = new FormData();
      formData.append('id', this.employeeId);
      formData.append('fullName', this.form.value.fullName);
      formData.append('photo', this.selectedFile);
    // formData.append('photoPath', this.form.value.photoPath2);
      formData.append('dateOfBirth', this.form.value.dateOfBirth);
      formData.append('nationality', this.form.value.nationality);
      //formData.append('bloodGroup', this.form.value.bloodGroup);
      formData.append('maritalStatus', this.form.value.maritalStatus);
      formData.append('gender', this.form.value.gender);
    
      formData.append('bankName', this.form.value.bankName);
      formData.append('branch', this.form.value.branch);
      formData.append('accountName', this.form.value.accountName);
      formData.append('bsb', this.form.value.bsb);
      formData.append('accountNumber',this.form.value.accountNumber);
    
      formData.append('houseNumber', this.form.value.houseNumber);
      formData.append('street', this.form.value.street);
      formData.append('city', this.form.value.city);
      formData.append('state', this.form.value.state);
      formData.append('country', this.form.value.country);
      formData.append('zipCode', this.form.value.zipCode);
    
      formData.append('emergencyContact', this.form.value.emergencyContact);
      formData.append('relationship', this.form.value.relationship);
      formData.append('emergencyContactPhoneNumber', this.form.value.emergencyContactPhoneNumber);
      formData.append('emergencyContactHouseNumber', this.form.value.emergencyContactHouseNumber,);
      formData.append('emergencyContactStreet', this.form.value.emergencyContactStreet,);
      formData.append('emergencyContactCity', this.form.value.emergencyContactCity,);
      formData.append('emergencyContactState', this.form.value.emergencyContactState,);
      formData.append('emergencyContactCountry', this.form.value.emergencyContactCountry,);
      formData.append('emergencyContactZipCode', this.form.value.emergencyContactZipCode);

      this.employeeService.createEmpPersonalDetails( formData)
      .subscribe(data =>{
        this. employeePersonalDetails =data;
        this.employeeCreatedOrUpdated = true;
      })
    }
   
  }

  onSelectStatus(event:any){
    if(this.form.value.status == "Full-Time"){
      this.myNameElem.nativeElement.value = 5;
        this.workHours = 7.6;
    }
    else
    {
      this.myNameElem.nativeElement.value = 0;
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
  onSelectFile(event: any) {
    this.selectedFile = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        else
        {
          // this.url = "";
          this.url = this.empOfficialDetails.employeePersonalDetails.photoPath
        }
  }
}