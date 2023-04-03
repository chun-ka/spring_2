import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { PaymentComponent } from './payment/payment.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CartListComponent, PaymentComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        ReactiveFormsModule
    ]
})
export class CartModule { }
