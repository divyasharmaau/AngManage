import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeePersonalDetails } from '../interfaces/employeePersonalDetails';

import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-personal-details',
  templateUrl: './employee-personal-details.component.html',
  styleUrls: ['./employee-personal-details.component.css']
})
export class EmployeePersonalDetailsComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }
  //employeePersonalDetails : EmployeePersonalDetails
  employeePersonalDetails = <EmployeePersonalDetails>{};
  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');

    this.showEmployeePersonalDetails(id);
  }


  showEmployeePersonalDetails(id: any){
    this.employeeService.getEmployeePersonalDetails(id)
    .subscribe(data =>
      {
     
     
        this.employeePersonalDetails = data

      })
  }

}
