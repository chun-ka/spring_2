import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {LoginService} from '../../security/service/login.service';
import {TokenService} from '../../security/service/token.service';
import {Router} from '@angular/router';
import {ShareService} from '../../security/service/share.service';
import Swal from 'sweetalert2';
import {OrderService} from '../../order/order.service';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  role = 'none';
  totalQuantity = 0;


  isLogged = false;
  carts: any = [];
  userId: any;
  orderId: any;

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false)
  });
  registerForm = new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    roles: new FormControl('customer')
  });


  constructor(private title: Title,
              private loginService: LoginService,
              private token: TokenService,
              private router: Router,
              private share: ShareService,
              private orderService: OrderService,
              private cartService: CartService) {

  }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger();
    this.title.setTitle('Trang chủ');
    if (this.isLogged) {
      this.role = this.token.getRole();
    }
    if (this.role!='ROLE_ADMIN'){
      this.changeQuantityByShare();
      this.getQuantityByShare();}
  }

  getQuantityByShare() {
    this.share.getData.subscribe(data => {
      this.totalQuantity = data.quantity;
    });
  }

  changeQuantityByShare() {
    this.isLogged = this.token.isLogger();
    if (this.isLogged && this.role!='ROLE_ADMIN') {
      this.userId = this.token.getId();
      this.cartService.getTotalQuantity(this.userId).subscribe(data => {
        if (data) {
          this.share.changeData({
            quantity: data.totalQuantity,
          });
        }
      }, error => {
        this.share.changeData({
          quantity: 0,
        });
      });
    } else {
      this.share.changeData({
        quantity: this.token.getTotalQuantity(),
      });
    }

  }


  login() {
    this.loginService.login(this.form.value).subscribe(next => {
        if (this.form.controls.rememberMe.value) {
          this.token.rememberMe(next.token, next.id, next.roles, 'local');
          this.ngOnInit();
        } else {
          this.token.rememberMe(next.token, next.id, next.roles, 'session');
          this.ngOnInit();

        }
        this.form.reset();
        this.role = this.token.getRole();

        let _this = this;
        setTimeout(function() {

          if (_this.role == 'ROLE_ADMIN') {
            location.href = ('http://localhost:4200/admin/product');
          }
        }, 500);

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Đăng nhập thành công!',
          showConfirmButton: false,
          timer: 2500
        },);
        if (this.role != 'ROLE_ADMIN') {
          this.getListByLogin();
        }

      }, error => {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Đăng nhập không thành công!',
          showConfirmButton: false,
          timer: 1500
        },);
      }
    );
  }


  insertCart() {
    this.carts = this.token.getCart();
    if (this.carts.length != 0) {
      for (let i = 0; i < this.carts.length; i++) {
        let quantity = this.carts[i].quantity;
        let foodId = this.carts[i].id;
        this.cartService.getCart(foodId, this.orderId).subscribe(data => {
          if (data) {
            this.cartService.updateCart(quantity, foodId, this.orderId).subscribe(data => {
              this.changeQuantityByShare();
            });
          } else {
            this.cartService.insertCart(quantity, foodId, this.orderId).subscribe(data => {
              this.changeQuantityByShare();
            });
          }
        });
      }
    }
  }


  getListByLogin() {
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.userId = this.token.getId();

      // getOrderId
      this.orderService.getCartOrder(this.userId).subscribe(data => {
        if (data != null) {
          this.orderId = data.idOrders;
          console.log(this.orderId);
          this.insertCart();
          let _this=this;
          setTimeout(function(){
            _this.share.changeDataOrderId({
              id:_this.orderId ,
            });
          },500)

        }
      }, error => {
        this.orderService.insertUser(this.userId).subscribe(data => {
          if (data != null) {
            this.orderService.getListOrder().subscribe(data => {
              this.orderId = data.length;
              this.insertCart();
              let _this=this;
              setTimeout(function(){
                _this.share.changeDataOrderId({
                  id:_this.orderId ,
                });
              },500)
            });
          }
        });
      });
    }
  }


  ngDoCheck(): void {
  }


  home() {
    this.title.setTitle('Trang chủ');
  }

  menu() {
    this.title.setTitle('Menu');

  }

  about() {
    this.title.setTitle('Giới thiệu');

  }

  contact() {
    this.title.setTitle('Liên hệ');
  }

  searchByName(search: string) {
    if (search != '') {
      this.router.navigate(['/menu', search]);
    }
  }

}
