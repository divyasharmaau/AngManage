import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BaseErrorFormComponent } from 'src/app/shared/baseErrorFormComponent';

import { EmployeeLeave } from '../interfaces/employeeLeave';
import { Leave } from '../interfaces/leave';

import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-edit-leave-admin',
  templateUrl: './edit-leave-admin.component.html',
  styleUrls: ['./edit-leave-admin.component.css']
})

export class EditLeaveAdminComponent  extends BaseErrorFormComponent implements OnInit {

  employeeLeave: EmployeeLeave;
  leaveDetails: Leave;
  form: FormGroup;
  idLeave: number;
  changeLeaveStatus: boolean = false;
  approveButton: boolean = false;
  declineButton: Boolean = false;
  successMessage: string ="The Leave has been Edited";
  leaveEdited: boolean = false;
  fileName:string="";

  constructor(private leaveService: LeaveService, private activatedRoute: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder) {
      super();
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
      "comment": ['', Validators.required],
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

   
        this.form.get('comment').setValue(this.leaveDetails.comment);
        this.form.get('leaveStatus').setValue(this.leaveDetails.leaveStatus);
        this.form.get('currentDate').setValue(moment(this.leaveDetails.currentDate).format('DD-MM-YYYY'));
        this.form.get('joiningDate').setValue(moment(this.leaveDetails.joiningDate).format('DD-MM-YYYY'))
        this.form.get('fromDate').setValue(moment(this.leaveDetails.fromDate).format('DD-MM-YYYY'));
        this.form.get('tillDate').setValue(moment(this.leaveDetails.tillDate).format('DD-MM-YYYY'));
        this.form.get('leaveType').setValue(this.leaveDetails.leaveType);
        this.form.get('duration').setValue(this.leaveDetails.duration);
        this.form.get('reason').setValue(this.leaveDetails.reason);
        this.form.get('filePath').setValue(this.getFileName(this.leaveDetails.filePath));
        this.form.get('balanceAnnualLeave').setValue(this.leaveDetails.balanceAnnualLeave);
        this.form.get('balanceSickLeave').setValue(this.leaveDetails.balanceSickLeave);
        this.form.get('approved').setValue('');
        this.form.get('declined').setValue('');

      }
      );
  }

getFileName(fileName:string){
  let name = this.leaveDetails.filePath.split('_');
  return this.fileName = name[1];
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
          this.employeeLeave = data;
          this.leaveEdited = true;
        })
    }
    else if(lId == "declinedId") {
      this.http.put<EmployeeLeave>('https://localhost:44330/api/leave/LeaveStatusByAdmin', body)
        .subscribe(data => {
          this.employeeLeave = data;
          this.leaveEdited = true;
        })
    }

  }
}
