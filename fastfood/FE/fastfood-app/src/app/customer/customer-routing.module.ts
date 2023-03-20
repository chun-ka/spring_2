import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerInfoComponent} from './customer-info/customer-info.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';

const routes: Routes = [{
  path:'customer',children:[
    {path:'',component:CustomerInfoComponent},
    {path:'edit',component:CustomerEditComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
