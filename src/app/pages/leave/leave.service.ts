import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { AppUserLeaveModel } from './interfaces/appUserLeaveModel';
import { EmployeeLeave } from './interfaces/employeeLeave';
import { Leave } from './interfaces/leave';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  applyLeaveGet(id:string){
    return this.http.get<Leave>('https://localhost:44330/api/leave/ApplyLeaveGet/'+ id);
  }
  applyLeave(id:string, model: FormData){
    alert("hi from service");
    return this.http.post<Leave>('https://localhost:44330/api/leave/ApplyLeave/', model);
  }
  getAllLeaves(){
   return this.http.get<AppUserLeaveModel[]>('https://localhost:44330/api/leave/');
  }

  myLeaveDetails(id:number){
    return this.http.get<Leave>('https://localhost:44330/api/leave/MyLeaveDetails/' + id)
  }
 
  getAllMyLeaves(id: string){
    return this.http.get<AppUserLeaveModel[]>('https://localhost:44330/api/leave/GetAllMyLeaves/' + id)
  }

  editLeave(id: number, leave: FormData )
  {
    return this.http.put<Leave>('https://localhost:44330/api/leave/' + id, leave);
  }
  deleteLeave(id:number){
    return this.http.delete('https://localhost:44330/api/leave/' + id);
  }

  leaveStatusByAdmin(employeeLeave: EmployeeLeave){

    return this.http.put<EmployeeLeave>('https://localhost:44330/api/leave/LeaveStatusByAdmin', employeeLeave );
  }
}
