import {Component, OnInit} from '@angular/core';
import {FoodService} from '../food.service';
import {Category} from '../../entity/food/category';
import {Food} from '../../entity/food/food';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../security/service/token.service';
import Swal from 'sweetalert2';
import {ShareService} from '../../security/service/share.service';
import {OrderService} from '../../order/order.service';
import {CartService} from '../../cart/cart.service';
import {Total} from '../../dto/total';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  categorys: Category[] = [];
  foodList: Food[] = [];
  food: Food = {price: 0};
  price: number = 0;
  pricePromotion: number = 0;
  quantity = 1;
  orderId: any;
  actives: any = [];

  carts: any = [];
  isLogged = false;
  userId: any;
  total: Total = {};
  role = 'none';


  constructor(private foodService: FoodService,
              private activatedRoute: ActivatedRoute,
              private token: TokenService,
              private share: ShareService,
              private orderService: OrderService,
              private cartService: CartService) {

    this.activatedRoute.paramMap.subscribe(data => {
      let name = data.get('name');
      if (name != ':name') {
        this.getListBySearch(name);
      }
    }, error => {
    });

    this.foodService.getListCombo().subscribe(data => {
      if (data != null) {
        this.foodList = data;
      }
    });

    this.foodService.getListCategory().subscribe(data => {
      this.categorys = data;
      this.actives[0] = 'active';
      for (let i = 1; i < this.categorys.length; i++) {
        this.actives[i] = '';
      }
    });

    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.role = this.token.getRole();
    }
  }

  ngOnInit(): void {
    this.getOrderId();
    this.isLogged = this.token.isLogger();
    window.scroll(0, 500);
    this.changeQuantityByShare();

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
        } else {
          this.share.changeData({
            quantity: 0,
          });
        }
      }, error => {
      });
    } else {
      this.share.changeData({
        quantity: this.token.getTotalQuantity(),
      });
    }

  }

  getOrderId() {
    if (this.role != 'ROLE_ADMIN') {
      this.share.getDataOrderId.subscribe(data => {
        this.orderId = data.id;
        console.log(this.orderId);
      });
      if (this.orderId == 0) {
        this.isLogged = this.token.isLogger();
        if (this.isLogged) {
          this.userId = this.token.getId();
          // getOrderId
          this.orderService.getCartOrder(this.userId).subscribe(data => {
            if (data != null) {
              this.orderId = data.idOrders;
              console.log(this.orderId);
            }else {
              this.orderService.insertUser(this.userId).subscribe(data => {
                if (data != null) {
                  this.orderService.getListOrder().subscribe(data => {
                    this.orderId = data.length;
                  });
                }
              });
            }
          }, error => {

          });
        }
      }
    }
  }


  category(categoryId: any, index: number) {

    for (let i = 0; i < this.actives.length; i++) {
      this.actives[i] = '';
    }
    this.actives[index] = 'active';
    this.foodService.getListFoodByCategory(categoryId).subscribe(data => {
      if (data != null) {
        this.foodList = data;
      }
    });
  }

  getListBySearch(name: string | null) {
    if (name != null) {
      this.foodService.getListBySearch(name).subscribe(data => {
        if (data != null) {
          this.foodList = data;
        }
      }, error => {
        Swal.fire(
          'Thông báo!',
          'Không có món ăn nào bạn cần tìm!',
          'warning'
        );
        this.foodService.getListCombo().subscribe(data => {
          if (data != null) {
            this.foodList = data;
          }
        });
      });
    }

  }


  infoFood(f: Food, price: any) {
    this.price = 0;
    this.quantity = 1;
    this.food = f;
    this.pricePromotion = Math.floor(Number(price - price * Number(f.promotion) / 100) / 1000) * 1000;
  }

  addToCartDetail(f: Food, quantity: string) {
    console.log(this.orderId);
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.cartService.getCart(f.idFood, this.orderId).subscribe(data => {
        if (data) {
          this.cartService.updateCart(parseInt(quantity), f.idFood, this.orderId).subscribe(data => {
            this.changeQuantityByShare();
            console.log('ok');
          });
        } else {
          this.cartService.insertCart(parseInt(quantity), f.idFood, this.orderId).subscribe(data => {
            this.changeQuantityByShare();
            console.log('ok2');
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

  updateQuantity(event: any) {
    let newQuantity = event.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    event.target.value = newQuantity;
    this.price = this.pricePromotion * Number(event.target.value);
  }

  addToCart(f: Food) {
    console.log(this.orderId);
    this.isLogged = this.token.isLogger();
    if (this.isLogged) {
      this.cartService.getCart(f.idFood, this.orderId).subscribe(data => {
        console.log(data);
        if (data) {
          this.cartService.updateCart(1, f.idFood, this.orderId).subscribe(data => {
            this.changeQuantityByShare();
            console.log(12345);
          });
        } else {
          this.cartService.insertCart(1, f.idFood, this.orderId).subscribe(data => {
            this.changeQuantityByShare();
            console.log(45678);
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
}
