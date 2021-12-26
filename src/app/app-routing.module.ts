import { NgModule } from '@angular/core';
import { LayoutAlignDirective } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';

const routes: Routes = [
    {path:'', component: LoginComponent},
   // {path:'login', component:LoginComponent},
    {
    path:'home' , component: DefaultComponent,
    children:[{
      path:'', component: DashboardComponent
    },{ path: 'employeeList', component:EmployeeListComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
