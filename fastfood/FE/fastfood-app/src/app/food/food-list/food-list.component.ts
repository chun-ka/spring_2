import {Component, OnInit} from '@angular/core';
import {FoodService} from '../food.service';
import {Category} from '../../entity/food/category';
import {Food} from '../../entity/food/food';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  categorys: Category[] = [];
  foodList:Food[]=[];
  food:Food={};
  price:number=0;
  pricePromotion:number=0;
  quantity=1;

  constructor(private foodService: FoodService,private activatedRoute:ActivatedRoute) {

    this.activatedRoute.paramMap.subscribe(data=>{
      if (data!=null){
        this.getListBySearch(data.get('name'));
      }
    },error => {
      this.foodService.getListCombo().subscribe(data=>{
        if (data!=null){
          this.foodList=data;
        }
      })
    });

    this.foodService.getListCategory().subscribe(data => {
      this.categorys=data;
      // console.log(data);
    });
  }

  ngOnInit(): void {
    window.scroll(0,500);
  }

  category(categoryId: any) {
    // console.log(categoryId);
    this.foodService.getListFoodByCategory(categoryId).subscribe(data=>{
      if (data!=null){
        this.foodList=data;

        // console.log(data);
      }
    })
  }

  getListBySearch(name: string | null){
    if (name!=null){
      this.foodService.getListBySearch(name).subscribe(data=>{
        if (data!=null){
          this.foodList=data;
          // console.log(data);
        }
      },error => {
        this.foodService.getListCombo().subscribe(data=>{
          if (data!=null){
            this.foodList=data;
            // console.log(data);
          }
        })
      })
    }

  }

  totalPrice(quantity: string) {
    this.price=this.pricePromotion*Number(quantity);
  }

  infoFood(f: Food, price: number) {
    this.price=0;
    this.quantity=1;
    this.food=f;
    this.pricePromotion=Math.floor((price-price*Number(f.promotion)/100)/1000)*1000;
    console.log(f,this.pricePromotion);
  }
}
