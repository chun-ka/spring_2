import {Component, DoCheck, OnInit} from '@angular/core';
import {User} from '../../entity/user/user';
import {TokenService} from '../../security/service/token.service';
import {Title} from '@angular/platform-browser';
import {CustomerService} from '../customer.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit,DoCheck {
  formUser:FormGroup;
  titleUser='info';
  user: User={};
  id:number=0;
  role='none';
  constructor(private token: TokenService,private title:Title,private customerService:CustomerService) {
    this.role = this.token.getRole();

    this.formUser=new FormGroup({
      idUser:new FormControl(),
      username:new FormControl(),
      name:new FormControl(),
      phoneNumber:new FormControl(),
      email:new FormControl(),
      address:new FormControl(),
      avatar:new FormControl(),
    })

  }

  ngDoCheck(): void {}



  ngOnInit(): void {
    this.title.setTitle('Trang cá nhân');
    this.id=Number(this.token.getId());
    if (this.id!=0){
      this.customerService.getUserById(this.id).subscribe(data=>{
        this.user=data;
      })
    }
  }


  logout() {
    this.token.logout();
    location.href=('http://localhost:4200/food');
  }

  info() {
    this.titleUser='info';
  }

  edit() {
    this.titleUser='edit';
    console.log(this.user);
    this.ngOnInit();
    this.formUser.patchValue(this.user);
  }

  history() {
    this.titleUser='history';
  }

  editUser() {
    this.customerService.updateUser(this.formUser.value).subscribe(data=>{
      this.info();
      this.ngOnInit();
    })
  }
}
