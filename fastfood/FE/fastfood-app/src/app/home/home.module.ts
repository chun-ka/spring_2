import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyComponent} from './body/body.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {AdminModule} from '../admin/admin.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    AboutComponent,
    ContactComponent,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BodyComponent,
    AboutComponent,
    MenuComponent,


  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        CarouselModule,
        FormsModule,
        AdminModule
    ]
})
export class HomeModule { }
