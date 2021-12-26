import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../interfaces/employee';
import { EmployeeSharedService } from '../services/employee-shared-service.service';
import { EmployeeService } from '../services/employee.service';

////import { Employee } from 'src/app/interfaces/employee';

//import { EmployeeSharedService } from '../services/employee-shared.service';
//import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  textSearch : string="";
  employeeList : any;
  displayedColumns: string[] = ['employeePersonalDetails.photoPath','fullName', 'department.name','status','manager', 'email'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  // constructor(private employeeService: EmployeeService,
  //   private employeeSharedService: EmployeeSharedService) { 
  //     this.employeeSharedService.myMethod$.subscribe((data) => {
  //       this.employeeList = data; // And he have data here too!
  //   }

  constructor(private employeeService: EmployeeService,
    private employeeSharedService: EmployeeSharedService
    ) { 
     this.employeeSharedService.searchEmployee$
     .subscribe(x =>{
       this.employeeList = x;

     });
   
}

  ngOnInit(): void {
    alert("initial start");
    if(this.employeeList == null){
      alert("hello");
      this.getEmployeeList();
     
    }
    //this.getEmployeeList();
  }

// search()
// {
//   this.employeeService.searchByEmail(this.textSearch)
//   .subscribe(data =>{
//     this.employeeList = data;
//   })
// }

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


