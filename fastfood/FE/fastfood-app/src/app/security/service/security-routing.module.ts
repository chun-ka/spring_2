import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {SignInComponent} from '../sign-up/sign-in.component';

const routes: Routes = [{
  path:'security',children:[
    {path:'',component:LoginComponent},
    {path:'sign-up',component:SignInComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
