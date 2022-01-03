import { NgModule } from '@angular/core';
import { LayoutAlignDirective } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddEditEmployeeOfficialDetailsComponent } from './pages/employee/add-edit-employee-official-details/add-edit-employee-official-details.component';
import { AddEditEmployeePersonalDetailsComponent } from './pages/employee/add-edit-employee-personal-details/add-edit-employee-personal-details.component';
import { EmployeeDetailsComponent } from './pages/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';

import { EmployeeOfficialDetailsComponent } from './pages/employee/employee-official-details/employee-official-details.component';
import { EmployeePersonalDetailsComponent } from './pages/employee/employee-personal-details/employee-personal-details.component';
import { ApplyLeaveComponent } from './pages/leave/apply-leave/apply-leave.component';
import { EditMyLeaveComponent } from './pages/leave/edit-my-leave/edit-my-leave.component';
import { LeaveListComponent } from './pages/leave/leave-list/leave-list.component';
import { MyLeaveDetailsComponent } from './pages/leave/my-leave-details/my-leave-details.component';
import { MyLeaveListComponent } from './pages/leave/my-leave-list/my-leave-list.component';
import { EditLeaveAdminComponent } from './pages/leave/edit-leave-admin/edit-leave-admin.component';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
    {path:'', component: LoginComponent},
   
    {
      path:'login', component:LoginComponent,
    },
    {
    path:'home' , component: DefaultComponent,
    children:[
    
      {
      path:'dashboard', component: DashboardComponent
    }
    ,{ 
      path: 'employeeList', component:EmployeeListComponent, canActivate:[RoleGuard]
    },
    {
      path:'employeeOfficialDetails/:id', component:EmployeeOfficialDetailsComponent
    },
    {
      path:'employeePersonalDetails/:id', component:EmployeePersonalDetailsComponent
    },
    { 
      path:'employeeDetails/:id', component:EmployeeDetailsComponent
    },
    {
      path:'addEmployeeOfficialDetails', component:AddEditEmployeeOfficialDetailsComponent, canActivate:[RoleGuard]
    },
    {
      path:'editEmployeeOfficialDetails/:id', component:AddEditEmployeeOfficialDetailsComponent, canActivate:[RoleGuard]
    },
    {
      path:'addEmployeePersonalDetails/:id', component:AddEditEmployeePersonalDetailsComponent
    },
    {
      path:'editEmployeePersonalDetails/:id', component:AddEditEmployeePersonalDetailsComponent
    },
    {
      path:'applyLeave', component:ApplyLeaveComponent
    },
    {
      path:'leaveList', component:LeaveListComponent, canActivate:[RoleGuard]
    },
    {
      path:'myLeaveList/:id', component:MyLeaveListComponent
    },
    {
      path:'editMyLeave/:id', component:EditMyLeaveComponent
    },
    {
      path:'myLeaveDetails/:id', component:MyLeaveDetailsComponent
    },
    {
      path:'editLeaveAdmin/:id', component:EditLeaveAdminComponent, canActivate:[RoleGuard]
    }
  ], canActivate:[AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
