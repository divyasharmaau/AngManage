import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Leave } from '../interfaces/leave';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-my-leave-details',
  templateUrl: './my-leave-details.component.html',
  styleUrls: ['./my-leave-details.component.css']
})

export class MyLeaveDetailsComponent implements OnInit {

  leave: Leave;
  form: FormGroup;
  fileName: string;
  constructor(private activatedRoute: ActivatedRoute, private leaveService: LeaveService, private fb: FormBuilder) {


    this.form = this.fb.group({
      "currentDate": [''],
      "fromDate": [''],
      "tillDate": [''],
      "leaveType": [''],
      "leaveStatus": [''],
      "duration": [''],
      "comment": [''],
      "reason": [''],
      "annualLeaveBalance": [''],
      "sickLeaveBalance": [''],
      "filePath": ['']
    });
  }

  ngOnInit(): void {
    var id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.leaveService.myLeaveDetails(id)
      .subscribe(data => {

        this.leave = data;
        this.form.get('currentDate').setValue(moment(this.leave.currentDate).format('DD-MM-YYYY'));
        this.form.get('fromDate').setValue(moment(this.leave.fromDate).format('DD-MM-YYYY'));
        this.form.get('tillDate').setValue(moment(this.leave.tillDate).format('DD-MM-YYYY'));
        this.form.get('leaveType').setValue(this.leave.leaveType);
        this.form.get('leaveStatus').setValue(this.leave.leaveStatus);
        this.form.get('duration').setValue(this.leave.duration);
        this.form.get('comment').setValue(this.leave.comment);
        this.form.get('reason').setValue(this.leave.reason);
        this.form.get('filePath').setValue(this.getFileName(this.leave.filePath));
        this.form.get('balanceAnnualLeave').setValue(this.leave.balanceAnnualLeave);
        this.form.get('balanceSickLeave').setValue(this.leave.balanceSickLeave);
      }
      );

  }


  getFileName(fileName: string) {
    let name = this.leave.filePath.split('_');
    return this.fileName = name[1];
  }

  showMyLeaveDetails(id: number) {

    this.leaveService.myLeaveDetails(id)
      .subscribe(data =>
        this.leave = data);
    console.log(this.leave);
  }
}

