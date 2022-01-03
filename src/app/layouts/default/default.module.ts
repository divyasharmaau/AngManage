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
import { AddEditEmployeeOfficialDetailsComponent } from 'src/app/pages/employee/add-edit-employee-official-details/add-edit-employee-official-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditEmployeePersonalDetailsComponent } from 'src/app/pages/employee/add-edit-employee-personal-details/add-edit-employee-personal-details.component';

import { ApplyLeaveComponent } from 'src/app/pages/leave/apply-leave/apply-leave.component';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { LeaveListComponent } from 'src/app/pages/leave/leave-list/leave-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MyLeaveListComponent } from 'src/app/pages/leave/my-leave-list/my-leave-list.component';
import { MatConfirmDialogComponent } from 'src/app/pages/leave/mat-confirm-dialog/mat-confirm-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { EditMyLeaveComponent } from 'src/app/pages/leave/edit-my-leave/edit-my-leave.component';
import { MyLeaveDetailsComponent } from 'src/app/pages/leave/my-leave-details/my-leave-details.component';
import { EditLeaveAdminComponent } from 'src/app/pages/leave/edit-leave-admin/edit-leave-admin.component';
//import { CustomErrorValidationComponent } from 'src/app/pages/employee/custom-error-validation/custom-error-validation.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    EmployeeListComponent,
    EmployeeOfficialDetailsComponent,
    EmployeePersonalDetailsComponent,
    EmployeeDetailsComponent,
    AddEditEmployeeOfficialDetailsComponent,
    AddEditEmployeePersonalDetailsComponent,
    ApplyLeaveComponent,
    LeaveListComponent,
    MyLeaveListComponent,
    MatConfirmDialogComponent,
    EditMyLeaveComponent,
    MyLeaveDetailsComponent,
    EditLeaveAdminComponent,
    //CustomErrorValidationComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule]
})
export class DefaultModule { }
