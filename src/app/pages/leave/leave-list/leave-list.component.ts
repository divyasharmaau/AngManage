import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatFormField } from '@angular/material/form-field';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';


import { AppUserLeaveModel } from '../interfaces/appUserLeaveModel';
import { LeaveService } from '../services/leave.service';
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
  constructor(private leaveService : LeaveService,
    //private dateAdapter: DateAdapter<Date>

    ) { 
  // this.dateAdapter.setLocale('en-AU'); //dd/MM/yyyy
   //this.dateAdapter.setLocale('your locale'); 
  //  this.employeeLeaves.filterPredicate =
  //   (data, filter: string) => !filter || data.fromDate.includes(filter);

  }

  displayedColumns: string[] = ['fullName','fromDate', 'tillDate','leaveType','reason','leaveStatus','numberOfLeaveDays','leaveBalance', 'leaveDetails'];
 //employeeLeaves: MatTableDataSource<EmployeeLeave>;
  //employeeLeaves = new MatTableDataSource(EmployeeLeave);
  public employeeLeaves: MatTableDataSource<AppUserLeaveModel>;
 @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  


  ngOnInit(): void {
    this.showAllLeaves();

    // this.employeeLeaves.filterPredicate = ((data: AppUserLeaveModel, filter: string): boolean => {
    //   const filterValues = JSON.parse(filter);
    //   return (this.approveChecked ? data.leaveStatus.trim() === filterValues.leaveStatus : true);
    // })

  }




  showAllLeaves(){
    this.leaveService.getAllLeaves()
    .subscribe(data =>{
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

  OnDateChange(event:Event){
    alert("hi");
    const filterValue = (event.target as HTMLInputElement).value;
    alert("filter Value" + filterValue);
 
    this.employeeLeaves.filter = filterValue;
    if(this.employeeLeaves.paginator){
      this.employeeLeaves.paginator.firstPage();
    }
  }
  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   alert(event.value);
  //   this.events.push(`${type}: ${event.value}`);
  // }
  inputEvent(event){
    // Return date object 
    console.log(event.value);
  }
  changeEvent(event){
    // const filterValue =moment(event.value).format('dd/MM/yyyy');
    const filterValue =event.value;
    
    this.employeeLeaves.filter = filterValue;
    if(this.employeeLeaves.paginator){
      this.employeeLeaves.paginator.firstPage();
    }
    alert(event.value);
    // Return date object
    
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    alert("hello");
    const filterValue = moment(event.value).format('yyyy/MM/dd');
    var date = new  Date (filterValue);
    alert("filterValue"+ filterValue);
    this.employeeLeaves.filter = filterValue;
    if (this.employeeLeaves.paginator) {
      this.employeeLeaves.paginator.firstPage();
    }
    
  }
  searchLeaveType(event: Event){
    const filterValue = (event.target as HTMLOptionElement).value;
    alert(filterValue + "serach");
    this.employeeLeaves.filter = filterValue;
    alert(  this.employeeLeaves.filter + "  this.employeeLeaves.filter");
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