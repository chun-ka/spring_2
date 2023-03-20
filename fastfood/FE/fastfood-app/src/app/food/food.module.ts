import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodListComponent } from './food-list/food-list.component';
import {HomeModule} from '../home/home.module';


@NgModule({
  declarations: [FoodListComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    HomeModule,
  ]
})
export class FoodModule { }
