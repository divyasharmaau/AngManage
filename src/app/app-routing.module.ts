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

const routes: Routes = [
    {path:'', component: LoginComponent},
   // {path:'login', component:LoginComponent},
    {
    path:'home' , component: DefaultComponent,
    children:[{
      path:'dashboard', component: DashboardComponent
    }
    ,{ 
      path: 'employeeList', component:EmployeeListComponent
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
      path:'addEmployeeOfficialDetails', component:AddEditEmployeeOfficialDetailsComponent
    },
    {
      path:'editEmployeeOfficialDetails/:id', component:AddEditEmployeeOfficialDetailsComponent
    },
    {
      path:'addEmployeePersonalDetails/:id', component:AddEditEmployeePersonalDetailsComponent
    },
    {
      path:'editEmployeePersonalDetails/:id', component:AddEditEmployeePersonalDetailsComponent
    }
  ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
