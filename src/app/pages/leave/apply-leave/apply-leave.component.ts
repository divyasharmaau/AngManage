import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { BaseErrorFormComponent } from 'src/app/shared/baseErrorFormComponent';

import { Leave } from '../interfaces/leave';
import { LeaveService } from '../services/leave.service';


@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})

export class ApplyLeaveComponent extends BaseErrorFormComponent implements OnInit {

  form: FormGroup;

  currentDate = new Date();
  minDate: Date;
  maxDate: Date;
  startDate: Date;
  employeeId :string;
  selectedFile: File = null;
  url: any;
  photoPath2: string = "";
  leave = <Leave>{};

  successMessage: string = "Leave has been applied";
  leaveCreated: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient
    , private leaveService: LeaveService
    , private route: ActivatedRoute
    , private authenticationService: AuthenticationService


  ) {
    super();

    var empId = this.authenticationService.getUserId();
    this.employeeId = empId;

    this.form = this.fb.group({
      "currentDate": new FormControl(this.currentDate.toISOString().split("T")[0]),
      "joiningDate": [''],
      "fromDate": ['',Validators.required],
      "tillDate": ['',Validators.required],
      "leaveType": [''],
      "duration": [''],
      "reason": [''],
      "balanceAnnualLeave": [''],
      "balanceSickLeave": [''],
      "file": ['']
    });

 
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
 
  }


  ngOnInit() {
    this.leaveService.applyLeaveGet(this.authenticationService.getUserId())
      .subscribe(data => {
        this.leave = data;
        // now data is here and can be used to set initial form values, example:
        this.form.get('leaveType').setValue(this.leave.leaveType);
        this.form.get('balanceAnnualLeave').setValue(this.leave.balanceAnnualLeave);
        this.form.get('balanceSickLeave').setValue(this.leave.balanceSickLeave);
        this.form.get('joiningDate').setValue(this.leave.joiningDate);
      }
      );
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
    else {
      this.url = "";
    }

  }

  onTillDate(){
      const startDate = this.fromDate.value;
      const endDate = this.tillDate.value;
    if(endDate < startDate ){
      this.tillDate.setErrors({mismatch:true});
    }
    else if (startDate == null && endDate != null){
      this.tillDate.setErrors({mismatch:true});
      this.fromDate.setErrors({mismatch:true});
    }
    else
    {
      this.tillDate.setErrors(null);
    }
  }

  get fromDate(): AbstractControl{
    return this.form.controls['fromDate'];
  }

  get tillDate() : AbstractControl{
    return this.form.controls['tillDate'];
  }
  

  onSubmit() {

    var userId = this.authenticationService.getUserId();
    const formData = new FormData();
    formData.append('UserId', userId);
    formData.append('CurrentDate', this.leave.currentDate.toString());
    formData.append('joiningDate', this.form.value.joiningDate);
    formData.append('FromDate', (moment(new Date(this.form.value.fromDate)).format("YYYY-MM-DD").toString()));
    formData.append('TillDate', (moment(new Date(this.form.value.tillDate)).format("YYYY-MM-DD").toString()));
    formData.append('LeaveType', this.form.value.leaveType);
    formData.append('Duration', this.form.value.duration);
    formData.append('Reason', this.form.value.reason);
    formData.append('BalanceAnnualLeave', this.leave.balanceAnnualLeave.toString());
    formData.append('BalanceSickLeave', this.leave.balanceSickLeave.toString());
    formData.append('File', this.selectedFile);



    this.leaveService.applyLeave(userId, formData)
      .subscribe(data => {
        this.leave = data;
        this.leaveCreated = true;
      })


  }



}