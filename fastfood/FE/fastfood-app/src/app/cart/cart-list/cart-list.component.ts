import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../security/service/token.service';
import Swal from 'sweetalert2';
import {ShareService} from '../../security/service/share.service';
import {Router} from '@angular/router';
import {OrderService} from '../../order/order.service';
import {CartService} from '../cart.service';
import {CartDto} from '../../dto/cart-dto';
import {render} from 'creditcardpayments/creditCardPayments';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../entity/user/user';
import {CustomerService} from '../../customer/customer.service';
import {Order} from '../../entity/order/order';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  carts: CartDto[] = [];
  saleFood: number = 0;
  totalPriceFood: number = 0;
  total = 0;

  isLogged = false;
  userId: any;
  orderId: any;
  title = 'cart';
  isPayment = false;
  paymentTotal: string = '';
  orderForm: FormGroup;
  user: User = {};
  currentDate: any;
  order: Order = {};


  constructor(private token: TokenService,
              private share: ShareService,
              private router: Router,
              private orderService: OrderService,
              private cartService: CartService,
              private customerService: CustomerService) {
    this.orderForm = new FormGroup({
      idOrders: new FormControl(),
      name: new FormControl('', [Validators.required]),
      deliveryAddress: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0[1-9]$')]),
      date: new FormControl(),
      user: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getOrderId();
    this.title = 'cart';
    this.isLogged = this.token.isLogger();
    window.scroll(0, 45);
    // this.getCartList();
    this.getTotalAndSale(this.carts);
    this.changeQuantityByShare();
  }

  getCartList() {
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.userId = Number(this.token.getId());
      this.cartService.getListCart(this.userId).subscribe(data => {
        this.carts = data;
        // console.log(data);
        this.getTotalAndSale(this.carts);
      }, error => {
        this.carts = [];
      });
    } else {
      this.carts = this.token.getCart();
    }
  }

  changeQuantityByShare() {
    if (this.isLogged) {
      this.userId = Number(this.token.getId());
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

  getOrderId() {
    this.share.getDataOrderId.subscribe(data => {
      this.orderId = data.id;
      this.getCartList();
      console.log(this.orderId);
    });
    if (this.orderId == 0) {
      this.isLogged = this.token.isLogger();
      if (this.isLogged) {
        this.userId = Number(this.token.getId());
        this.orderService.getCartOrder(this.userId).subscribe(data => {
          if (data != null) {
            this.orderId = Number(data.idOrders);
            console.log(this.orderId);
          }
        },error => {
          this.orderService.insertUser(this.userId).subscribe(data => {
            if (data != null) {
              this.orderService.getListOrder().subscribe(data => {
                this.orderId = data.length;
                console.log(this.orderId);
              });
            }
          });
        });
      }
    }
  }

  subTotal(cart: any) {
    let totalPrice = cart.price * cart.quantity - cart.quantity * (Math.floor(cart.price * (Number(cart.priceSale) / 100) / 1000) * 1000);
    return totalPrice;
  }

  getTotalAndSale(carts: any[]) {
    carts.filter(cart => {
      this.total += cart.price * cart.quantity;
      this.totalPriceFood += this.subTotal(cart);
      this.saleFood += cart.price * cart.quantity - this.subTotal(cart);
    });
  }


  downQuantity(index: number, quantity: any) {
    console.log(this.orderId);
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      if (quantity > 1) {
        this.cartService.updateCart(-1, this.carts[index].id, this.orderId).subscribe(data => {
          this.totalPriceFood = 0;
          this.saleFood = 0;
          this.total = 0;

          this.getCartList();
          this.changeQuantityByShare();
        });
      }
    } else {
      let newQuantity = parseInt(quantity) - 1;
      newQuantity = newQuantity > 0 ? newQuantity : 1;
      this.carts = this.token.getCart();
      this.carts[index].quantity = newQuantity;
      this.token.saveCart(this.carts);
      this.changeQuantityByShare();
      this.totalPriceFood = 0;
      this.saleFood = 0;
      this.total = 0;
      this.getTotalAndSale(this.carts);
    }
  }

  upQuantity(index: number, quantity: any) {
    console.log(this.orderId);
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      if (quantity < 100) {
        this.cartService.updateCart(1, this.carts[index].id, this.orderId).subscribe(data => {
          this.changeQuantityByShare();
          this.totalPriceFood = 0;
          this.saleFood = 0;
          this.total = 0;

          this.getCartList();
        });
      }
    } else {
      let newQuantity = parseInt(quantity) + 1;
      newQuantity = newQuantity <= 100 ? newQuantity : 100;
      this.carts = this.token.getCart();
      this.carts[index].quantity = newQuantity;
      this.token.saveCart(this.carts);
      this.changeQuantityByShare();
      this.totalPriceFood = 0;
      this.saleFood = 0;
      this.total = 0;

      this.getTotalAndSale(this.carts);
    }
  }

  removeCart(index: number) {
    console.log(this.orderId);
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.cartService.removeCart(this.carts[index].id,this.orderId).subscribe(data => {
        this.changeQuantityByShare();
        this.totalPriceFood = 0;
        this.saleFood = 0;
        this.total = 0;

        this.getCartList();
      });
    } else {
      this.carts.splice(index, 1);
      this.token.saveCart(this.carts);
      this.changeQuantityByShare();
      this.totalPriceFood = 0;
      this.saleFood = 0;
      this.total = 0;

      this.getTotalAndSale(this.carts);
    }
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sản phẩm đã bị xóa khỏi giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  payment() {
    this.getUserInfo();
    this.currentDate = new Date(Date.now());
    this.isLogged = this.token.isLogger();
    if (!this.isLogged) {
      Swal.fire(
        'Không thành công!',
        'Bạn cần phải đăng nhập để tiếp tục thanh toán!',
        'warning'
      );
    } else {
      this.title = 'payment';
    }
  }

  saveOrder() {
    this.order = this.orderForm.value;
    console.log(this.order);
    this.paymentTotal = String(+((this.totalPriceFood / 23485.48).toFixed(2)));
    this.isPayment = true;
    let _this = this;
    setTimeout(function() {
      render(
        {
          id: '#payments',
          currency: 'USD',
          value: _this.paymentTotal,
          onApprove: (details) => {
            _this.orderService.order(_this.order).subscribe(data => {
              Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Thanh toán thành công!',
                showConfirmButton: false,
                timer: 1500
              });
              _this.ngOnInit();

            }, error => {
              Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Thanh toán không thành công!',
                showConfirmButton: false,
                timer: 1500
              });
            });
          }
        }
      );
    }, 100);

  }

  getUserInfo() {
    this.userId = this.token.getId();
    this.customerService.getUserById(this.userId).subscribe(data => {
      if (data != null) {
        this.user = data;
      }
    });
  }

  get orderFormValue() {
    return this.orderForm.controls;
  }

}
