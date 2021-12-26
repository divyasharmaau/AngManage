import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { EmployeePersonalDetails } from '../interfaces/employeePersonalDetails';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }


  getEmployeeList(){
    return this.http.get<Employee[]>('https://localhost:44330/api/employee/')
  }

  getEmployeeOfficialDetails(id: string){
    return this.http.get<Employee>('https://localhost:44330/api/employee/' + id)
  }

  getEmployeePersonalDetails(id: string){
    return this.http.get<EmployeePersonalDetails>('https://localhost:44330/api/employee/GetEmployeePersonalDetails/' + id)
  }

  createEmployee(employeeDetails: Employee){
    return this.http.post<Employee>('https://localhost:44330/api/employee/', employeeDetails)
  }

  editEmployee(id:string, employeeDetails: Employee){
    return this.http.put<Employee>("https://localhost:44330/api/employee/" + id , employeeDetails)

  }

  
  createEmpPersonalDetails(empPersonalDetails : FormData){
    return this.http.post<EmployeePersonalDetails>
    ('https://localhost:44330/api/employee/CreateEmployeePersonalDetails/', empPersonalDetails)
  }
  
  editEmployeePersonalDetails(id:string,employeePersonalDetails: FormData){
    return this.http.put<EmployeePersonalDetails>('https://localhost:44330/api/employee/UpdateEmployeePersonalDetails/'+ id, employeePersonalDetails);
  }

  search(searchTerm: string){
    return this.http.get<Employee[]>('https://localhost:44330/api/employee/Search/' + searchTerm);
  }

  getDataSynchronous(searchTerm: string) {
    return  this.http.get<Employee[]>('https://localhost:44330/api/employee/Search/' + searchTerm).toPromise()
}


}   
