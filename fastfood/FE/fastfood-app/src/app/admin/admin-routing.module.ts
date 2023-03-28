import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component';
import {RevenueComponent} from './revenue/revenue.component';
import {HistoryComponent} from './history/history.component';

const routes: Routes = [{
  path:'',children:[
    {path:'admin/product',component:ProductComponent},
    {path:'admin/category',component:CategoryComponent},
    {path:'admin/revenue',component:RevenueComponent},
    {path:'admin/history',component:HistoryComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
