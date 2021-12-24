import { NgModule } from '@angular/core';
import { LayoutAlignDirective } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeListComponent } from './modules/employee-list/employee-list.component';

const routes: Routes = [{
  //path: '', component:LayoutAlignDirective;
    path:'' , component: DefaultComponent,
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
