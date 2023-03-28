import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [{
  path:'cart',children:[
    {path:'',component:CartListComponent},
    {path:'payment',component:PaymentComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
