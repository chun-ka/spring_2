import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [CartListComponent, PaymentComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
