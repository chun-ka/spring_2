import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import {CustomerInfoComponent} from './customer-info/customer-info.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';


@NgModule({
  declarations: [
    CustomerInfoComponent,
    CustomerEditComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
