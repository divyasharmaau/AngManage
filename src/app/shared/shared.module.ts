import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotPermittedComponent } from './not-permitted/not-permitted.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageNotFoundComponent,
    NotPermittedComponent

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatCardModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PageNotFoundComponent,
    NotPermittedComponent
  ]
})
export class SharedModule { }
