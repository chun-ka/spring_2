import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../security/service/token.service';
import {FoodService} from '../../food/food.service';
import {Food} from '../../entity/food/food';
import {FoodJson} from '../../entity/food/food-json';
import {Category} from '../../entity/food/category';
import {FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  titleProduct = '';
  categoryId: any = '';
  page: number = 0;
  foods: Food[] = [];
  food: Food = {price: 0};
  categorys: Category[] = [];
  foodPage!: FoodJson;

  constructor(private tokenService: TokenService, private foodService: FoodService) {
    this.titleProduct='titleList';
    this.productForm = new FormGroup({
      idFood: new FormControl(),
      name: new FormControl(),
      img: new FormControl(),
      category: new FormControl(),
      price: new FormControl(),
      promotion: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getListFood(this.categoryId, this.page);
    this.getListCategory();
    this.food={price:0};

  }

  titleList() {
    this.titleProduct = 'titleList';
    this.getListFood('',0);
  }

  titleEdit() {
    if (!this.food.idFood){
      Swal.fire(
        'Good job!',
        'Chọn sản phẩm cần chỉnh sửa!',
        'warning'
      )
    }
    this.titleProduct = 'titleEdit';
    this.productForm.patchValue(this.food);
    this.ngOnInit();

  }

  titleDelete() {
    this.titleProduct = 'titleDelete';
  }

  titleCreate() {
    this.food={price:0};
    this.titleProduct = 'titleCreate';
    this.ngOnInit();

  }

  getIdClick(food: any) {
    this.food = food;
    // console.log(food);
  }

  changePage(page: number) {
    this.page=page;
    this.getListFood(this.categoryId, page);
  }

  getListFood(category: any, page: number) {
    this.foodService.getListFood(category, page).subscribe(data => {
      this.foods = data.content;
      this.foodPage = data;
      // console.log(this.foods);
    });
  }

  getListCategory() {
    this.foodService.getListCategory().subscribe(data => {
      this.categorys = data;
    });
  }

  search(categoryId: any) {
    // console.log(categoryId);
    this.categoryId = categoryId;
    this.getListFood(categoryId, 0);
  }

  create() {
    this.food = this.productForm.value;

    this.foodService.saveFood(this.food).subscribe(data => {
      // console.log(data);
      this.titleList();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Thêm mới sản phẩm thành công!',
        showConfirmButton: false,
        timer: 2500
      },)

    });
  }

  compareWithCategory(o1: Category, o2: Category): boolean {
    return o1 && o2 ? o1.idCategory === o2.idCategory : o1 === o2;
  }

  edit() {
    this.foodService.editFood(this.productForm.value).subscribe(data=>{
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Chỉnh sửa sản phẩm thành công!',
        showConfirmButton: false,
        timer: 2500
      },)
      this.titleList();
      this.ngOnInit();
    })
  }

  delete(idFood: any) {
    this.foodService.deleteFood(idFood).subscribe(data=>{
      this.titleProduct = 'titleList';
      this.ngOnInit();

    })
  }

  noDelete() {
    this.titleProduct = 'titleList';
    this.ngOnInit();

  }
}
