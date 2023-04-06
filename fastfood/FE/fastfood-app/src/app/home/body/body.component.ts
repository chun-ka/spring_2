import {Component, DoCheck, OnInit} from '@angular/core';
import {FoodService} from '../../food/food.service';
import {Food} from '../../entity/food/food';
import {TokenService} from '../../security/service/token.service';
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
  orderId: any;
  userId: any;
  orderIdFood:number=0;

  constructor(private foodService: FoodService,
              private token: TokenService,
              private share: ShareService,
              private orderService: OrderService,
              private cartService: CartService) {
    this.isLogged = this.token.isLogger();
  }

  ngOnInit(): void {
    this.getOrderId();
    this.changeQuantityByShare();
    this.getListFoodPromotion(this.pagePromotion);
    this.getListFoodFamous(this.pageFamous);
  }

  changeQuantityByShare() {
    this.isLogged = this.token.isLogger();
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
    });
    if (this.orderId == 0) {
      this.isLogged = this.token.isLogger();
      if (this.isLogged) {
        this.userId = this.token.getId();

        // getOrderId
        this.orderService.getCartOrder(this.userId).subscribe(data => {
          if (data != null) {
            this.orderId = data.idOrders;
          }
        }, error => {
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
    this.getListFoodPromotion(this.pagePromotion);
  }

  nextFoodPromotion(pagePromotion: number) {
    this.pagePromotion = pagePromotion;
    this.getListFoodPromotion(this.pagePromotion);

  }

  nextFoodFamous(pageFamous: number) {
    this.pageFamous = pageFamous;
    this.getListFoodFamous(this.pageFamous);

  }

  previousFoodFamous(pageFamous: number) {
    this.pageFamous = pageFamous;
    this.getListFoodFamous(this.pageFamous);

  }


  infoFood(f: Food, price: any) {
    this.price = 0;
    this.quantity = 1;
    this.food = f;
    this.promotionPrice = price - (Math.floor(price * (Number(f.promotion) / 100) / 1000) * 1000);
    this.getOrderId();
  }

  updateQuantity(event: any) {

    let newQuantity = event.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    event.target.value = newQuantity;
    this.price = this.promotionPrice * Number(event.target.value);

  }


  async addToCart(f: Food) {
    console.log(this.orderId);
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      await
        this.cartService.getCart(f.idFood, this.orderId).subscribe(data => {
          if (data) {
            this.cartService.updateCart(1, f.idFood, this.orderId).subscribe(data => {
              this.changeQuantityByShare();
            });
          } else {
            this.cartService.insertCart(1, f.idFood, this.orderId).subscribe(data => {
              this.changeQuantityByShare();
            });
          }
        }, error => {
        });
    } else {
      this.carts = this.token.getCart();
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
      this.changeQuantityByShare();
    }
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  addToCartDetail(f: Food, quantity: string) {
    console.log(this.orderId);
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.cartService.getCart(f.idFood, this.orderId).subscribe(data => {
        if (data) {
          this.cartService.updateCart(parseInt(quantity), f.idFood, this.orderId).subscribe(data => {
            this.changeQuantityByShare();
          });
        } else {
          this.cartService.insertCart(parseInt(quantity), f.idFood, this.orderId).subscribe(data => {
            this.changeQuantityByShare();
          });
        }
      });
    } else {
      this.carts = this.token.getCart();
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
      }
      this.token.saveCart(this.carts);
      this.changeQuantityByShare();
    }
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
