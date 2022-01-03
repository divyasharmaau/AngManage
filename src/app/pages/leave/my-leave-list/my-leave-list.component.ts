import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DialogService } from '../services/dialog.service';
import { AppUserLeaveModel } from '../interfaces/appUserLeaveModel';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { LeaveService } from '../services/leave.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';


@Component({
  selector: 'app-my-leave-list',
  templateUrl: './my-leave-list.component.html',
  styleUrls: ['./my-leave-list.component.css']
})

export class MyLeaveListComponent implements OnInit {


  leaveList : any[];
  employeeId: string;
  employeeLeave : AppUserLeaveModel;
  leaveDeleted: boolean= false;
  deletedMessage: string = "Leave has been deleted";

  approveChecked: boolean;
  declineChecked: boolean;
  allChecked: boolean;
  pendingChecked: boolean;

  minDate: Date;
  maxDate: Date;
  fromdate: any;

 // public employeeLeaves: MatTableDataSource<AppUserLeaveModel>;


  public displayedColumns = ['fullName', 'fromDate', 'tillDate','leaveType','numberOfLeaveDays','reason','leaveStatus','leaveDetails','delete' ];
  //the source where we will get the data
  //public dataSource = new MatTableDataSource<AppUserLeaveModel>();
  public employeeLeaves: MatTableDataSource<AppUserLeaveModel>;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id$: any;

  constructor(private http : HttpClient ,private activatedRoute : ActivatedRoute, private leaveService: LeaveService
              , private authenticationService: AuthenticationService,
              private dialogService: DialogService
          ) {


   }

ngOnInit(): void{

  var empId = this.authenticationService.getUserId();
  this.employeeId = empId;
//   var Lid = +this.activatedRoute.snapshot.paramMap.get('employeeLeave.leaveId');
// alert(Lid+ "hello");
  this.showAllMyLeaves(empId, null);

  // this.employeeLeaves.sort = this.sort;

  // const sortState: Sort = {active: 'fromDate', direction: 'desc'};
  // this.sort.active = sortState.active;
  // this.sort.direction = sortState.direction;
  // this.sort.sortChange.emit(sortState);
}
  
showAllMyLeaves(id:string, fromDate:any){
  this.leaveService.getAllMyLeaves(id, fromDate)
  .subscribe(data =>{
    this.employeeLeaves = new MatTableDataSource<AppUserLeaveModel>(data);
    this.employeeLeaves.paginator = this.paginator;
    this.employeeLeaves.sort = this.sort;
    //this.dataSource.data = data
  });
   
}

// deleteMyLeave(leaveId){
//   alert(leaveId);


//   if(confirm("Do you  want to delete this leave")){
//     this.leaveService.deleteLeave(leaveId)
//     .subscribe(data =>{
//       this.leaveDeleted = true;
//     //this.showAllMyLeaves(this.employeeId);  
//   },error => console.log(error));

// }

// }
// changeEvent(event){

//   let filterValue = moment(event.value).format("YYYY-MM-DD");
//   this.fromDate
//   this.showAllLeaves(filterValue);
//   this.employeeLeaves.filter = filterValue;
//   if(this.employeeLeaves.paginator){
//     this.employeeLeaves.paginator.firstPage();
//   }

  
// }
// changeEvent(event){
//   alert("change event my Laeve list");
//   let filterValue = moment(event.value).format("YYYY-MM-DD");
//   this.leaveService.getAllMyLeaves(filterValue);
//   this.employeeLeaves.filter = filterValue;
//   if(this.employeeLeaves.paginator){
//     this.employeeLeaves.paginator.firstPage();
//   }
// }
inputEvent(event){
  // Return date object
  //alert("input Event"); 
  console.log(event.value);
}

changeEvent(event){
  let filterValue = moment(event.value).format("YYYY-MM-DD");
  this.showAllMyLeaves(this.employeeId,filterValue);
  this.employeeLeaves.filter = filterValue;
  if(this.employeeLeaves.paginator){
    this.employeeLeaves.paginator.firstPage();
  }

  
}
searchLeaveType(event: Event){
  const filterValue = (event.target as HTMLOptionElement).value;
  alert(filterValue + "serach");
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
deleteMyLeave(leaveId){
  alert(leaveId);
  this.dialogService.openConfirmDialog('Do you  want to delete this leave?')
  .afterClosed().subscribe(res => {
    if(res){
      this.leaveService.deleteLeave(leaveId).subscribe(data => {
        this.leaveDeleted = true;
        this.leaveService.getAllMyLeavesDelete(this.employeeId);
        //this.showAllMyLeaves(this.employeeId);
      })
    }
  })

  // if(confirm("Do you  want to delete this leave")){
  //   this.leaveService.deleteLeave(leaveId)
  //   .subscribe(data =>{
  //     this.leaveDeleted = true;
  //   //this.showAllMyLeaves(this.employeeId);  
  // },error => console.log(error));

}
close(){
  //if this is true , this function close() will be called
  this.leaveDeleted = false;
}
}
