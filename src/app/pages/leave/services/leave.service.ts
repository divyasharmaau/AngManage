import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUserLeaveModel } from '../interfaces/appUserLeaveModel';
import { EmployeeLeave } from '../interfaces/employeeLeave';
import { Leave } from '../interfaces/leave';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  applyLeaveGet(id:string){
    return this.http.get<Leave>(this.baseUrl + '/leave/ApplyLeaveGet/'+ id);
  }
  applyLeave(id:string, model: FormData){
    return this.http.post<Leave>(this.baseUrl + '/leave/ApplyLeave/', model);
  }

  getAllLeaves(fromDate:any){
    if(fromDate == null ){
      return  this.http.get<AppUserLeaveModel[]>(this.baseUrl + '/leave/')
    }  
  else if (fromDate != null ){
    return  this.http.get<AppUserLeaveModel[]>(this.baseUrl + '/leave/?fromdate='+ fromDate);
  }
   return this.http.get<AppUserLeaveModel[]>(this.baseUrl + '/leave/');

  }


  myLeaveDetails(id:number){
    return this.http.get<Leave>(this.baseUrl + '/leave/MyLeaveDetails/' + id)
  }
 
  getAllMyLeavesDelete(id: string){
 
    return this.http.get<AppUserLeaveModel[]>(this.baseUrl + '/leave/GetAllMyLeaves/' + id)
  }

  getAllMyLeaves( id: string, fromDate:any)
  {
    if(fromDate == null){
      return this.http.get<AppUserLeaveModel[]>(this.baseUrl + '/leave/GetAllMyLeaves/' + id)
    }
    else if(fromDate!= null)
    {
      return this.http.get<AppUserLeaveModel[]>(this.baseUrl + '/leave/GetAllMyLeaves/'+ id +'/?fromDate='+ fromDate);
    }
    return this.http.get<AppUserLeaveModel[]>(this.baseUrl + '/leave/GetAllMyLeaves/' + id)
  }
  editLeave(id: number, leave: FormData )
  {
    return this.http.put<Leave>(this.baseUrl + '/leave/' + id, leave);
  }
  deleteLeave(id:number){
    return this.http.delete(this.baseUrl + '/leave/' + id);
  }

  leaveStatusByAdmin(employeeLeave: any){

    return this.http.put<EmployeeLeave>(this.baseUrl + '/leave/LeaveStatusByAdmin', employeeLeave );
  }
}
