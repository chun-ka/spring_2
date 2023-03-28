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

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  categorys: Category[] = [];
  foodList: Food[] = [];
  food: Food = {price:0};
  price: number = 0;
  pricePromotion: number = 0;
  quantity = 1;
  orderId:any;

  carts:any=[];
  isLogged=false;
  userId:any;

  constructor(private foodService: FoodService,
              private activatedRoute: ActivatedRoute,
              private token:TokenService,
              private share:ShareService,
              private orderService:OrderService,
              private cartService:CartService) {

    this.activatedRoute.paramMap.subscribe(data => {
      if (data != null) {
        this.getListBySearch(data.get('name'));
      }
    }, error => {
      this.foodService.getListCombo().subscribe(data => {
        if (data != null) {
          this.foodList = data;
          // console.log(data);
        }
      });
    });

    this.foodService.getListCategory().subscribe(data => {
      this.categorys = data;
      // console.log(data);
    });
  }

  ngOnInit(): void {
    this.isLogged=this.token.isLogger();
    window.scroll(0, 500);
    this.carts=this.token.getCart();
    this.changeQuantityByShare();
    this.getOrderId();
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


  changeQuantityByShare(){
    this.share.changeData({
      quantity: this.token.getTotalQuantity(),
    });
  }

  category(categoryId: any) {
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
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    })
    this.changeQuantityByShare();
    this.isLogged=this.token.isLogger();
    let _this=this;
    setTimeout(function() {
      if (_this.isLogged){
        _this.cartService.insertCart(parseInt(quantity), f.idFood, _this.orderId).subscribe(data => {
        });
      }
    }, 100);
  }

  updateQuantity(event: any) {
    let newQuantity = event.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    event.target.value = newQuantity;
    this.price = this.pricePromotion * Number(event.target.value);
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

    this.changeQuantityByShare();
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sản phẩm đã được thêm vào giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    })
    this.isLogged=this.token.isLogger();
    let _this=this;
    setTimeout(function() {
      if (_this.isLogged){
        _this.cartService.insertCart(1, f.idFood, _this.orderId).subscribe(data => {
        });
      }
    }, 100);


  }
}
