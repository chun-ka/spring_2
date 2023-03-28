import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Food} from '../../entity/food/food';
import {Category} from '../../entity/food/category';
import {FoodJson} from '../../entity/food/food-json';
import {TokenService} from '../../security/service/token.service';
import {FoodService} from '../../food/food.service';

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
      name: new FormControl()
    });
  }

  ngOnInit(): void {
    this.titleCaterogy = 'titleList';
    this.getListCategory();
  }

  titleList() {
    this.titleCaterogy = 'titleList';
  }

  titleEdit() {
    this.titleCaterogy = 'titleEdit';
    this.categoryForm.patchValue(this.category);
    this.getListCategory();

  }

  titleDelete() {
    this.titleCaterogy = 'titleDelete';
  }

  titleCreate() {
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

    });
  }



  edit() {
    this.foodService.editCategory(this.categoryForm.value).subscribe(data=>{

      this.titleList();
      this.ngOnInit();
    })
  }

  delete(idCategory: any) {
    this.foodService.deleteCategory(idCategory).subscribe(data=>{
      this.titleCaterogy = 'titleList';
      this.ngOnInit();

    })
  }

  noDelete() {
    this.titleCaterogy = 'titleList';
    this.ngOnInit();

  }

}
