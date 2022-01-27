import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../interfaces/employee';

import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  textSearch : string="";
 
  profilePic :string ="";
  employeeList : any;
  displayedColumns: string[] = ['employeePersonalDetails.apiPhotoPath','fullName', 'department.name','status','manager', 'email'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;



  constructor(private employeeService: EmployeeService,
  
    ) { 

}

  ngOnInit(): void {
    if(this.employeeList == null){
    this.getEmployeeList();
    }
    
  }


  getEmployeeList(){
    this.employeeService.getEmployeeList()
    .subscribe((data: any) =>{
      this.employeeList = new MatTableDataSource<Employee>(data);
      this.employeeList.paginator = this.paginator;
      this.employeeList.sort = this.sort;
      console.log(JSON.stringify(data));
     
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeList.filter = filterValue.trim().toLowerCase();

    if (this.employeeList.paginator) {
      this.employeeList.paginator.firstPage();
    }

  }
}


