import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../entity/food/category';
import {Food} from '../entity/food/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  URL_FOOD_PROMOTION="http://localhost:8080/food/promotion";
  URL_FOOD_FAMOUS="http://localhost:8080/food/famous";
  URL_CATEGORY="http://localhost:8080/food/category";
  URL_LIST_COMBO="http://localhost:8080/food/combo";
  URL_LIST_FOOD="http://localhost:8080/food";
  URL_CREATE_FOOD="http://localhost:8080/food/create";
  URL_EDIT_FOOD="http://localhost:8080/food/edit";
  URL_DELETE_FOOD="http://localhost:8080/food/delete";


  constructor(private httpClient:HttpClient) { }

  getListFoodPromotion(page:number):Observable<any> {
    return this.httpClient.get<any>(this.URL_FOOD_PROMOTION+'?page='+page);
  }

  getListFoodFamous(page:number):Observable<any>{
    return this.httpClient.get<any>(this.URL_FOOD_FAMOUS+'?page='+page)
  }

  getListCategory():Observable<any>{
    return this.httpClient.get<any>(this.URL_CATEGORY);
  }

  getListCombo():Observable<any> {
    return this.httpClient.get<any>(this.URL_LIST_COMBO);
  }

  getListFoodByCategory(categoryId: string,):Observable<any> {
    return this.httpClient.get<any>(this.URL_LIST_FOOD+'/categoryId?categoryId='+categoryId)
  }

  getListFood(categoryId: string,page:number):Observable<any> {
    return this.httpClient.get<any>(this.URL_LIST_FOOD+'?categoryId='+categoryId+'&page='+page)
  }

  getListBySearch(name: string | null):Observable<any> {
    return this.httpClient.get<any>(this.URL_LIST_FOOD+'/search'+'?name='+name);
  }

  saveFood(food:any){
    return this.httpClient.post(this.URL_CREATE_FOOD,food);
  }

  editFood(food: any) {
    return this.httpClient.put(this.URL_EDIT_FOOD,food);
  }

  deleteFood(idFood: number) {
    return this.httpClient.delete(this.URL_DELETE_FOOD+'/'+idFood);
  }



  saveCategory(category: any) {
    return this.httpClient.post(this.URL_CATEGORY+'/create',category);

  }

  editCategory(category: any) {
    return this.httpClient.put(this.URL_CATEGORY+'/edit',category);

  }

  deleteCategory(idCategory: number) {
    return this.httpClient.delete(this.URL_CATEGORY+'/delete/'+idCategory);

  }
}
