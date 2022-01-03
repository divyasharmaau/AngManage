import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../interfaces/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
 export class EmployeeDetailsComponent implements OnInit {
 

  showOfficial : boolean = false;
  showPersonal : boolean = false;
  showCreatePersonal: boolean = false;
  panelOpenStateOff : boolean = false;
  panelOpenStatePers : boolean = false;
  panelOpenStateCreatePersonalDetails : boolean = false;


  employeeOfficialDetails: Employee;
  flag : boolean = false;   
  /**
   * the default value for boolean is false
   * 
   */

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  constructor(private route : ActivatedRoute, private employeeService: EmployeeService) {
    var id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeOfficialDetails(id)
    .subscribe(data =>
      {
        this.employeeOfficialDetails = data;
        if(this.employeeOfficialDetails.employeePersonalDetails != null)
        {
           this.flag = false;
          //this.showEmployeePersonalDetails();
        }
        else
        {
          this.flag = true;
        }
      })
   }

  ngOnInit(): void {
  }
  showEmployeeOfficialDetails(){
    this.showOfficial = true;
  }

  showEmployeePersonalDetails(){
      this.showPersonal = true;
  }

  showCreatePersonalDetails(){
    this.showCreatePersonal = true;
  }

  clickCloseOfficial(){
    this.panelOpenStateOff = false;
  }
}
