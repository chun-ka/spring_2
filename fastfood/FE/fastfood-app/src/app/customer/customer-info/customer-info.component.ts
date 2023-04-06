import {Component, DoCheck, OnInit} from '@angular/core';
import {User} from '../../entity/user/user';
import {TokenService} from '../../security/service/token.service';
import {Title} from '@angular/platform-browser';
import {CustomerService} from '../customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../cart/cart.service';
import {CartDto} from '../../dto/cart-dto';
import {OrderHistoryJson} from '../../entity/order/order-history-json';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit,DoCheck {

  formUser:FormGroup;
  titleUser='info';
  user: User={};
  userId:number=0;
  role='none';
  orderHistorys: CartDto[]=[];
  orderHistoryPage!:OrderHistoryJson;
  startDay:any='';
  endDay:any='';
  totalPrice:number[]=[];

  selectedImage: any = null;
  downloadURL: Observable<string> | undefined;
  userEdit:User={};


  constructor(private token: TokenService,
              private title:Title,
              private customerService:CustomerService,
              private cartService:CartService,
              private storage: AngularFireStorage) {
    this.role = this.token.getRole();

    this.formUser=new FormGroup({
      idUser:new FormControl(),
      username:new FormControl('',[Validators.required]),
      name:new FormControl('',[Validators.required]),
      phoneNumber:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      avatar:new FormControl('',[Validators.required]),
    })

  }

  ngDoCheck(): void {}



  ngOnInit(): void {
    this.userId=Number(this.token.getId());
    this.title.setTitle('Trang cá nhân');
    if (this.userId!=0){
      this.customerService.getUserById(this.userId).subscribe(data=>{
        this.user=data;
      })
    }
    this.search('',new Date(Date.now()),0);
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
    this.userEdit=this.user;
    console.log(this.user);
    this.ngOnInit();
    this.formUser.patchValue(this.user);
  }

  history() {
    this.titleUser='history';
  }

  editUser() {
    this.customerService.updateUser(this.formUser.value).subscribe(data=>{
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Chỉnh sửa thông tin thành công!',
        showConfirmButton: false,
        timer: 2500
      })
      this.info();
      this.ngOnInit();
    })
  }

  search(startDay: any, endDay: any, page: number) {
    this.startDay=startDay;
    this.endDay=endDay;
    if (endDay==''){
      endDay=new Date(Date.now());
    }
    this.cartService.getHistory(startDay,endDay,this.userId,page).subscribe(data=>{
      this.orderHistorys=data.content;
      for (let i = 0; i < this.orderHistorys.length; i++) {
        // @ts-ignore
        this.totalPrice[i]=Math.floor(Number(this.orderHistorys[i].price * this.orderHistorys[i].quantity    -   this.orderHistorys[i].price * this.orderHistorys[i].quantity*this.orderHistorys[i].priceSale / 100) / 1000) * 1000;
      }
      this.orderHistoryPage=data;
      console.log(data);
    },error => {
      this.orderHistorys=[];
    })
  }

  changePage(page: number) {
    this.search(this.startDay,this.endDay,page);
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const filePath = this.selectedImage.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // @ts-ignore
          this.downloadURL.subscribe(url => {
            if (url) {
              // lấy lại url
              this.userEdit.avatar=url;
            }
            this.formUser.patchValue({avatar: url});
            // console.log('link: ', this.fb);
          });
        })
      )
      .subscribe();
  }

  get formUserValue(){
    return this.formUser.controls;
  }
}
