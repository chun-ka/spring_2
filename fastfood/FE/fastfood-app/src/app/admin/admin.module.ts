import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ProductComponent} from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { RevenueComponent } from './revenue/revenue.component';
import { HistoryComponent } from './history/history.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ProductComponent,
        CategoryComponent,
        RevenueComponent,
        HistoryComponent,
    ],
    exports: [
        ProductComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ]
})
export class AdminModule {
}
