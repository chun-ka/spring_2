import {Component, DoCheck, OnInit} from '@angular/core';
import {FoodService} from '../../food/food.service';
import {Food} from '../../entity/food/food';
import {TokenService} from '../../security/service/token.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pagePromotion:number=0;
  foodPromotion:Food[]=[];
  foodFamous:Food[]=[];
  pageFamous:number=0;
  pricePromotion:number[]=[];
  priceFamous:number[]=[];
  totalpagePromotion: number=0;
  totalpageFamous: number=0;
  price=0;
  quantity=0;
  food:Food={};
  promotionPrice:number=0;
  role='none';

  constructor(private foodService:FoodService,private token: TokenService) {
    // this.role = this.token.getRole();
    // console.log(this.role+'345');
  }

  ngOnInit(): void {
    // this.role = this.token.getRole();

    this.foodService.getListFoodPromotion(this.pagePromotion).subscribe(data=>{
      this.foodPromotion=data.content;
      this.totalpagePromotion=data.totalPages;
      if (this.foodPromotion.length!=0){
      for (let i = 0; i < this.foodPromotion.length; i++) {
        // @ts-ignore
        this.pricePromotion[i]=Math.floor((this.foodPromotion[i].price-this.foodPromotion[i].price*this.foodPromotion[i].promotion/100)/1000)*1000;
      }
      }
      // console.log(data);
    });
    this.foodService.getListFoodFamous(this.pageFamous).subscribe(data=>{
      this.foodFamous=data.content;
      this.totalpageFamous=data.totalPages;
      // console.log(data);
      if (this.foodFamous.length!=0){
        for (let i = 0; i < this.foodFamous.length; i++) {
          // @ts-ignore
          this.priceFamous[i]=Math.floor((this.foodFamous[i].price-this.foodFamous[i].price*this.foodFamous[i].promotion/100)/1000)*1000;
        }
      }

    })
  }


  previousFoodPromotion(pagePromotion: number) {
    this.pagePromotion=pagePromotion;
    this.ngOnInit();
  }

  nextFoodPromotion(pagePromotion: number) {
    this.pagePromotion=pagePromotion;
    this.ngOnInit();
  }

  nextFoodFamous(pageFamous: number) {
    this.pageFamous=pageFamous;
    this.ngOnInit();

  }

  previousFoodFamous(pageFamous: number) {
    this.pageFamous=pageFamous;
    this.ngOnInit();

  }

  infoFood(f: Food, price: number) {
    this.price=0;
    this.quantity=1;
    this.food=f;
    this.promotionPrice=Math.floor((price-price*Number(f.promotion)/100)/1000)*1000;

    console.log(f,this.pricePromotion);
  }

  totalPrice(quantity: string) {
    this.price=this.promotionPrice*Number(quantity);
  }


}
