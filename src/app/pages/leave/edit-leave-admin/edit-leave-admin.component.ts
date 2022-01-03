import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EmployeeLeave } from '../interfaces/employeeLeave';
import { Leave } from '../interfaces/leave';

import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-edit-leave-admin',
  templateUrl: './edit-leave-admin.component.html',
  styleUrls: ['./edit-leave-admin.component.css']
})

export class EditLeaveAdminComponent implements OnInit {

  employeeLeave: EmployeeLeave;
  leaveDetails: Leave;
  form: FormGroup;
  idLeave: number;
  changeLeaveStatus: boolean = false;
  approveButton: boolean = false;
  declineButton: Boolean = false;

  constructor(private leaveService: LeaveService, private activatedRoute: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      "currentDate": [''],
      "joiningDate": [''],
      "fromDate": [''],
      "tillDate": [''],
      "leaveType": [''],
      "duration": [''],
      "reason": [''],
      "balanceAnnualLeave": [''],
      "balanceSickLeave": [''],
      "filePath": [''],
      "comment": [''],
      "leaveStatus": [''],
      "approved": [''],
      "declined": ['']
    });
  }

  ngOnInit(): void {

    var id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.idLeave = id;
    this.leaveService.myLeaveDetails(id)
      .subscribe(data => {

        this.leaveDetails = data;
        if (this.leaveDetails.leaveStatus == null) {
          this.approveButton = true;
          this.declineButton = true;
        }
        else if (this.leaveDetails.leaveStatus == "Approved") {
          this.declineButton = true;
          this.approveButton = false;
        }
        else if (this.leaveDetails.leaveStatus == "Declined") {
          this.declineButton = false;
          this.approveButton = true;
        }

        //this.getFileName(this.leave.filePath);
        // alert(this.leave.filePath.substr(this.leave.filePath.lastIndexOf("/")+1));
        // now data is here and can be used to set initial form values, example:
        // this.form.get('duration').setValue(this.leaveDetails.duration);
        // this.form.get('id').setValue(this.leaveDetails.id);
        this.form.get('comment').setValue(this.leaveDetails.comment);
        this.form.get('leaveStatus').setValue(this.leaveDetails.leaveStatus);
        this.form.get('currentDate').setValue(moment(this.leaveDetails.currentDate).format('DD-MM-YYYY'));
        this.form.get('joiningDate').setValue(moment(this.leaveDetails.joiningDate).format('DD-MM-YYYY'))
        this.form.get('fromDate').setValue(this.leaveDetails.fromDate);
        this.form.get('tillDate').setValue(this.leaveDetails.tillDate);
        this.form.get('leaveType').setValue(this.leaveDetails.leaveType);
        this.form.get('duration').setValue(this.leaveDetails.duration);
        this.form.get('reason').setValue(this.leaveDetails.reason);
        this.form.get('filePath').setValue(this.leaveDetails.filePath.substr(this.leaveDetails.filePath.lastIndexOf("/") + 1));
        this.form.get('balanceAnnualLeave').setValue(this.leaveDetails.balanceAnnualLeave);
        this.form.get('balanceSickLeave').setValue(this.leaveDetails.balanceSickLeave);
        this.form.get('approved').setValue('');
        this.form.get('declined').setValue('');


        //this.form.get('filePath').setValue(this.leave.filePath);
        //location.pathname.substr(location.pathname.lastIndexOf("/")+1);
      }
      );

    // const body = {'leaveId' : id}

    // this.http.put<EmployeeLeave>('https://localhost:44330/api/leave/LeaveStatusByAdmin', body)
    // .subscribe(data =>{
    //   console.log(data);
    // })
  }

  onSubmit() {

    var lId = document.activeElement.id;
    const body = {
        'leaveId': this.idLeave,
        'comment': this.form.value.comment,
        'declined': 'declined',

      }
    if (lId == "approvedId") {
      const body = {
        'leaveId': this.idLeave,
        'comment': this.form.value.comment,
        'approved': 'approved',
      }
      this.http.put<EmployeeLeave>('https://localhost:44330/api/leave/LeaveStatusByAdmin', body)
        .subscribe(data => {
        })
    }
    else if(lId == "declinedId") {
      this.http.put<EmployeeLeave>('https://localhost:44330/api/leave/LeaveStatusByAdmin', body)
        .subscribe(data => {
        })
    }

  }
}
