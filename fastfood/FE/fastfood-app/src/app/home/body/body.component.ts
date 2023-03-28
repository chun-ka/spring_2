import {Component, DoCheck, OnInit} from '@angular/core';
import {FoodService} from '../../food/food.service';
import {Food} from '../../entity/food/food';
import {TokenService} from '../../security/service/token.service';
import {Cart} from '../../entity/cart/cart';
import Swal from 'sweetalert2';
import {ShareService} from '../../security/service/share.service';
import {OrderService} from '../../order/order.service';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pagePromotion: number = 0;
  foodPromotion: Food[] = [];
  foodFamous: Food[] = [];
  pageFamous: number = 0;
  pricePromotion: number[] = [];
  priceFamous: number[] = [];
  totalpagePromotion: number = 0;
  totalpageFamous: number = 0;
  price = 0;
  quantity = 0;
  food: Food = {price: 0};
  promotionPrice: number = 0;


  isLogged = false;
  carts: any = [];
  orderId = 0;
  totalQuantity: any;
  userId: number = 0;


  constructor(private foodService: FoodService,
              private token: TokenService,
              private share: ShareService,
              private orderService: OrderService,
              private cartService: CartService) {
    this.carts = this.token.getCart();
    this.isLogged = this.token.isLogger();

  }

  ngOnInit(): void {
    this.getOrderId();
    this.getQuantityByShare();
    this.changeQuantityByShare();
    this.getListFoodPromotion(this.pagePromotion);
    this.getListFoodFamous(this.pageFamous);

  }

  getQuantityByShare() {
    this.share.getData.subscribe(data => {
      this.totalQuantity = data.quantity;
    });

  }

  changeQuantityByShare() {
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


  getListFoodPromotion(page: number) {
    this.foodService.getListFoodPromotion(page).subscribe(data => {
      this.foodPromotion = data.content;
      this.totalpagePromotion = data.totalPages;
      if (this.foodPromotion.length != 0) {
        for (let i = 0; i < this.foodPromotion.length; i++) {
          // @ts-ignore
          this.pricePromotion[i] = this.foodPromotion[i].price - (Math.floor(this.foodPromotion[i].price * Number(this.foodPromotion[i].promotion / 100) / 1000) * 1000);
        }
      }
    });
  }

  getListFoodFamous(page: number) {
    this.foodService.getListFoodFamous(page).subscribe(data => {
      this.foodFamous = data.content;
      this.totalpageFamous = data.totalPages;
      if (this.foodFamous.length != 0) {
        for (let i = 0; i < this.foodFamous.length; i++) {
          // @ts-ignore
          this.priceFamous[i] = this.foodFamous[i].price - (Math.floor(this.foodFamous[i].price * Number(this.foodFamous[i].promotion / 100) / 1000) * 1000);
        }
      }
    });
  }


  previousFoodPromotion(pagePromotion: number) {
    this.pagePromotion = pagePromotion;
    this.ngOnInit();

  }

  nextFoodPromotion(pagePromotion: number) {
    this.pagePromotion = pagePromotion;
    this.ngOnInit();

  }

  nextFoodFamous(pageFamous: number) {
    this.pageFamous = pageFamous;
    this.ngOnInit();

  }

  previousFoodFamous(pageFamous: number) {
    this.pageFamous = pageFamous;
    this.ngOnInit();

  }

  infoFood(f: Food, price: any) {
    this.price = 0;
    this.quantity = 1;
    this.food = f;
    this.promotionPrice = price - (Math.floor(price * (Number(f.promotion) / 100) / 1000) * 1000);
  }

  updateQuantity(event: any) {

    let newQuantity = event.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    event.target.value = newQuantity;
    this.price = this.promotionPrice * Number(event.target.value);

  }


  addToCart(f: Food) {
    let index = -1;
    for (let i = 0; i < this.carts.length; i++) {
      if (f.idFood == this.carts[i].id) {
        index = i;
      }
    }
    if (index != -1) {
      this.carts[index].quantity += 1;
    } else {
      let cartItem: any = {
        id: f.idFood,
        name: f.name,
        img: f.img,
        quantity: 1,
        price: f.price,
        priceSale: f.promotion
      };
      this.carts.push(cartItem);

    }
    this.token.saveCart(this.carts);

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    });
    this.changeQuantityByShare();
    this.isLogged = this.token.isLogger();
    let _this=this;
    setTimeout(function() {
      if (_this.isLogged) {
        _this.cartService.insertCart(1, f.idFood, _this.orderId).subscribe(data => {
        });
      }
    }, 100);

  }

  addToCartDetail(f: Food, quantity: string) {
    let index = -1;
    for (let i = 0; i < this.carts.length; i++) {
      if (f.idFood == this.carts[i].id) {
        index = i;
      }
    }
    if (index != -1) {
      this.carts[index].quantity += parseInt(quantity);
    } else {
      let cartItem: any = {
        id: this.food.idFood,
        name: this.food.name,
        img: this.food.img,
        quantity: parseInt(quantity),
        price: this.food.price,
        priceSale: this.food.promotion
      };
      this.carts.push(cartItem);
      this.token.saveCart(this.carts);
    }
    console.log(this.carts);
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    });
    this.changeQuantityByShare();
    this.isLogged = this.token.isLogger();

    let _this=this;
    setTimeout(function() {
      if (_this.isLogged) {
        _this.cartService.insertCart(parseInt(quantity), f.idFood, _this.orderId).subscribe(data => {
        });
      }
    }, 100);
  }

}
