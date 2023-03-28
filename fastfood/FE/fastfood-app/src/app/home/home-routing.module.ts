import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {BodyComponent} from './body/body.component';

const routes: Routes = [
  {path:'',children:[
      {path:'food',component:BodyComponent},
      {path:'about',component:AboutComponent},
      {path:'contact',component:ContactComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
