import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../interfaces/department';
import { Employee } from '../interfaces/employee';
import { EmployeePersonalDetails } from '../interfaces/employeePersonalDetails';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-official-details',
  templateUrl: './employee-official-details.component.html',
  styleUrls: ['./employee-official-details.component.css']
})
export class EmployeeOfficialDetailsComponent implements OnInit {

  //employeeDetails : Employee;
   employeeDetails = <Employee>{};

  close: boolean = false;
  constructor(private employeeService : EmployeeService,
              private route: ActivatedRoute,  private router: Router) { 
                
              }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');

    this.employeeDetails.employeePersonalDetails =<EmployeePersonalDetails>{};
    this.employeeDetails.department = <Department>{};

    this.showEmployeeOfficialDetails(id);

  }

  showEmployeeOfficialDetails(id: string){
    alert("employee official");
    this.employeeService.getEmployeeOfficialDetails(id)
    .subscribe(data =>
      this.employeeDetails = data
      );

  }

  clickCloseOfficial(){
    alert("clickCloseOfficial");
  
    this.router.navigate['/admin/list'];
  }
}
