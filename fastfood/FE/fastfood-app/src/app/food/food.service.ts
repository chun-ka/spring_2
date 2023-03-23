import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../entity/food/category';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  URL_FOOD_PROMOTION="http://localhost:8080/food/promotion";
  URL_FOOD_FAMOUS="http://localhost:8080/food/famous";
  URL_CATEGORY="http://localhost:8080/food/category";
  URL_LIST_COMBO="http://localhost:8080/food/combo";
  URL_LIST_FOOD="http://localhost:8080/food";
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

  getListFoodByCategory(categoryId: number):Observable<any> {
    return this.httpClient.get<any>(this.URL_LIST_FOOD+'?categoryId='+categoryId)
  }

  getListBySearch(name: string | null):Observable<any> {
    return this.httpClient.get<any>(this.URL_LIST_FOOD+'/search'+'?name='+name);
  }
}
