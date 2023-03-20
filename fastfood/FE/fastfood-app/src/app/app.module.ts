import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module';
import {CartModule} from './cart/cart.module';
import {FoodModule} from './food/food.module';
import {OrderModule} from './order/order.module';
import {SecurityModule} from './security/service/security.module';
import {HttpClientModule} from '@angular/common/http';
import {CustomerModule} from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CartModule,
    FoodModule,
    OrderModule,
    SecurityModule,
    HttpClientModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
