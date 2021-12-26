import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';

import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';


import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

import { EmployeeOfficialDetailsComponent } from 'src/app/pages/employee/employee-official-details/employee-official-details.component';
import { EmployeeListComponent } from 'src/app/pages/employee/employee-list/employee-list.component';
import { EmployeePersonalDetailsComponent } from 'src/app/pages/employee/employee-personal-details/employee-personal-details.component';

import { EmployeeDetailsComponent } from 'src/app/pages/employee/employee-details/employee-details.component';

import {MatExpansionModule} from '@angular/material/expansion';











@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    EmployeeListComponent,
    EmployeeOfficialDetailsComponent,
    EmployeePersonalDetailsComponent,
    EmployeeDetailsComponent,
    

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule

  ]
})
export class DefaultModule { }
