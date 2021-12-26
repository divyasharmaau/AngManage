import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { EmployeeListComponent } from 'src/app/pages/employee-list/employee-list.component';





@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule

  ]
})
export class DefaultModule { }
