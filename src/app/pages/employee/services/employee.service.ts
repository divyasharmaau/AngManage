import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { EmployeePersonalDetails } from '../interfaces/employeePersonalDetails';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getEmployeeList() {
    return this.http.get<Employee[]>(this.baseUrl + '/employee/')
  }

  getEmployeeOfficialDetails(id: string) {
    return this.http.get<Employee>(this.baseUrl + '/employee/' + id)
  }

  getEmployeePersonalDetails(id: string) {
    return this.http.get<EmployeePersonalDetails>(this.baseUrl + '/employee/GetEmployeePersonalDetails/' + id)
  }

  createEmployee(employeeDetails: Employee) {
    return this.http.post<Employee>(this.baseUrl + '/employee/', employeeDetails)
  }

  editEmployee(id: string, employeeDetails: Employee) {
    return this.http.put<Employee>(this.baseUrl + '/employee/' + id, employeeDetails)

  }


  createEmpPersonalDetails(empPersonalDetails: FormData) {
    return this.http.post<EmployeePersonalDetails>
      (this.baseUrl + '/employee/CreateEmployeePersonalDetails/', empPersonalDetails)
  }

  editEmployeePersonalDetails(id: string, employeePersonalDetails: FormData) {
    return this.http.put<EmployeePersonalDetails>(this.baseUrl + '/employee/UpdateEmployeePersonalDetails/' + id, employeePersonalDetails);
  }

 
}   
