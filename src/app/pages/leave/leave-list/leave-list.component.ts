import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';


import { AppUserLeaveModel } from '../interfaces/appUserLeaveModel';
import { LeaveService } from '../services/leave.service';
import { LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY } from '@angular/cdk/a11y';
@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {

  filterValues: any = {};
  approveChecked: boolean;
  declineChecked: boolean;
  allChecked: boolean;
  pendingChecked: boolean;
  minDate: Date;
  maxDate: Date;
  tillDate: any;
  fromDate: any;
  constructor(private leaveService: LeaveService
  ) { }

  displayedColumns: string[] = ['fullName', 'fromDate', 'tillDate', 'leaveType', 'reason', 'leaveStatus', 'numberOfLeaveDays', 'leaveBalance', 'leaveDetails'];

  public employeeLeaves: MatTableDataSource<AppUserLeaveModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  ngOnInit(): void {
    this.showAllLeaves(null);
  }


  showAllLeaves(fromDate: any) {
    this.leaveService.getAllLeaves(fromDate)
      .subscribe(data => {
        this.employeeLeaves = new MatTableDataSource<AppUserLeaveModel>(data);
        this.employeeLeaves.paginator = this.paginator;
        this.employeeLeaves.sort = this.sort;
        console.log(this.employeeLeaves);
        console.log(JSON.stringify(data));

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeLeaves.filter = filterValue.trim().toLowerCase();
    if (this.employeeLeaves.paginator) {
      this.employeeLeaves.paginator.firstPage();
    }

  }


  inputEvent(event) {
    console.log(event.value);
  }
  changeEvent(event) {

    let filterValue = moment(event.value).format("YYYY-MM-DD");
    this.showAllLeaves(filterValue);

    this.employeeLeaves.filter = filterValue;
    if (this.employeeLeaves.paginator) {
      this.employeeLeaves.paginator.firstPage();
    }


  }

  searchLeaveType(event: Event) {
    const filterValue = (event.target as HTMLOptionElement).value;
    this.employeeLeaves.filter = filterValue;
    if (this.employeeLeaves.paginator) {
      this.employeeLeaves.paginator.firstPage();
    }
  }


  applyFilterChecked(column: string, filterValue: string) {
    this.employeeLeaves.filter = filterValue;
    if (this.employeeLeaves.paginator) {
      this.employeeLeaves.paginator.firstPage();
    }
  }

}