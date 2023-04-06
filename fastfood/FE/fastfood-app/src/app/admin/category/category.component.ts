import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Food} from '../../entity/food/food';
import {Category} from '../../entity/food/category';
import {FoodJson} from '../../entity/food/food-json';
import {TokenService} from '../../security/service/token.service';
import {FoodService} from '../../food/food.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  titleCaterogy = '';
  categorys: Category[] = [];
  category: Category={};

  constructor(private tokenService: TokenService, private foodService: FoodService) {
    this.categoryForm = new FormGroup({
      idCategory: new FormControl(),
      name: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    this.titleCaterogy = 'titleList';
    this.getListCategory();
  }

  titleList() {
    this.titleCaterogy = 'titleList';
    this.category={};
  }

  titleEdit() {
    this.categoryForm.reset();
    this.titleCaterogy = 'titleEdit';
    if (!this.category.idCategory){
      this.titleList();
      Swal.fire(
        'Thông báo!',
        'Chọn danh mục cần chỉnh sửa!',
        'warning'
      )
    };
    this.categoryForm.patchValue(this.category);
    this.getListCategory();

  }

  titleDelete() {
    this.titleCaterogy = 'titleDelete';
    if (!this.category.idCategory){
      this.titleList();
      Swal.fire(
        'Thông báo!',
        'Chọn danh mục cần xóa!',
        'warning'
      )
    };
  }

  titleCreate() {
    this.categoryForm.reset();
    this.titleCaterogy = 'titleCreate';
  }

  getCategoryClick(category: any) {
    this.category = category;
    // console.log(food);
  }



  getListCategory() {
    this.foodService.getListCategory().subscribe(data => {
      this.categorys = data;
    });
  }


  create() {
    this.category = this.categoryForm.value;
    this.foodService.saveCategory(this.category).subscribe(data => {
      // console.log(data);
      this.titleList();
      this.ngOnInit();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Thêm mới danh mục thành công!',
        showConfirmButton: false,
        timer: 2500
      });
    });
  }



  edit() {
    this.foodService.editCategory(this.categoryForm.value).subscribe(data=>{
      this.titleList();
      this.ngOnInit();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Chỉnh sửa danh mục thành công!',
        showConfirmButton: false,
        timer: 2500
      });
    })
  }

  delete(idCategory: any) {
    this.foodService.deleteCategory(idCategory).subscribe(data=>{
      this.titleCaterogy = 'titleList';
      this.ngOnInit();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Xóa thành công!',
        showConfirmButton: false,
        timer: 2500
      });
    })
  }

  noDelete() {
    this.titleCaterogy = 'titleList';
    this.ngOnInit();
  }

  get categoryFormValue(){
    return this.categoryForm.controls;
  }

}
