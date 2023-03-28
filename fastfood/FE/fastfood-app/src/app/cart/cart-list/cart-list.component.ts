import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../security/service/token.service';
import Swal from 'sweetalert2';
import {ShareService} from '../../security/service/share.service';
import {Router} from '@angular/router';
import {OrderService} from '../../order/order.service';
import {CartService} from '../cart.service';
import {Cart} from '../../entity/cart/cart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  carts: any = [];
  saleFood: number = 0;
  totalPriceFood: number = 0;

  isLogged=false;
  userId:any;
  orderId:any;

  constructor(private token: TokenService,
              private share:ShareService,
              private router:Router,
              private orderService:OrderService,
              private cartService:CartService) {
  }

  ngOnInit(): void {
    this.isLogged=this.token.isLogger();
    window.scroll(0, 45);
    this.carts = this.token.getCart();
    this.getTotalAndSale(this.carts);
    this.changeQuantityByShare();
    this.getOrderId();
  }

  changeQuantityByShare(){
    this.share.changeData({
      quantity: this.token.getTotalQuantity(),
    });
  }

  getOrderId() {
    if (this.isLogged) {
      this.userId = Number(this.token.getId());
      this.orderService.getCartOrder().subscribe(data => {
        if (data != null) {
          this.orderId = Number(data.idOrders);
          console.log(this.orderId);
        } else {
          this.orderService.insertUser(this.userId).subscribe(data => {
            if (data != null) {
              this.orderService.getListOrder().subscribe(data => {
                this.orderId = data.length;
                console.log(this.orderId);

              });
            }
          });
        }
      });
    }
  }

  subTotal(cart: any) {

    let totalPrice = cart.price * cart.quantity - cart.quantity * (Math.floor(cart.price * (Number(cart.priceSale) / 100) / 1000) * 1000);
    return totalPrice;
  }

  getTotalAndSale(carts: any[]) {
    carts.filter(cart => {
      this.totalPriceFood += this.subTotal(cart);
      this.saleFood += cart.price * cart.quantity - this.subTotal(cart);

    });
  }


  downQuantity(index: number, quantity: any) {
    let newQuantity = parseInt(quantity) - 1;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    this.carts[index].quantity = newQuantity;
    this.token.saveCart(this.carts);
    this.totalPriceFood=0;
    this.saleFood=0;
    this.getTotalAndSale(this.carts);
    this.changeQuantityByShare();
    this.isLogged=this.token.isLogger();
    if (this.isLogged){
      // this.cartService.updateCart(1, this.carts[index].id, this.orderId).subscribe(data => {
      //
      // });
    }
  }

  upQuantity(index: number, quantity: any) {
    let newQuantity = parseInt(quantity) + 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    this.carts[index].quantity = newQuantity;
    this.token.saveCart(this.carts);
    this.totalPriceFood=0;
    this.saleFood=0;
    this.getTotalAndSale(this.carts);
    this.changeQuantityByShare();
    this.isLogged=this.token.isLogger();
    let _this=this;
    setTimeout(function() {
      if (_this.isLogged){
        _this.cartService.insertCart(1, _this.carts[index].id, _this.orderId).subscribe(data => {
        });
      }
    }, 100);

  }

  removeCart(index: number) {
    this.carts.splice(index,1);
    this.token.saveCart(this.carts);
    this.totalPriceFood=0;
    this.saleFood=0;
    this.getTotalAndSale(this.carts);
    this.changeQuantityByShare();
    this.isLogged=this.token.isLogger();
    if (this.isLogged){
      this.cartService.removeCart( this.carts[index].id).subscribe(data => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Sản phẩm đã bị xóa khỏi giỏ hàng!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
  }

  payment() {
    this.isLogged = this.token.isLogger();
    if (!this.isLogged){
      Swal.fire(
        'Không thành công!',
        'Bạn cần phải đăng nhập để tiếp tục thanh toán!',
        'warning'
      )
    }else {
      console.log(this.carts);
      this.userId=this.token.getId();
      if (this.userId){
        this.orderService.insertUser(this.userId).subscribe(data=>{
          if (data!=null){
            this.orderService.getListOrder().subscribe(data=>{
              this.orderId=data.length;
              if (this.orderId!=0){
                this.carts=this.token.getCart();
                for (let i = 0; i < this.carts.length; i++) {
                  let quantity=this.carts[i].quantity;
                  let foodId=this.carts[i].id;
                  this.cartService.insertCart(quantity,foodId,this.orderId).subscribe(data=>{

                    // this.carts=[];
                    // this.token.saveCart(this.carts);

                    // this.share.changeData({
                    //   quantity:this.token.getTotalQuantity()
                    // })
                    this.router.navigateByUrl('/cart/payment');
                  })
                }
              }
            })
          }
        })
      }
    }
  }
}
