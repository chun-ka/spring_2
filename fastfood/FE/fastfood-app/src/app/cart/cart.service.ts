import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartDto} from '../dto/cart-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  URL_INSERT_CART='http://localhost:8080/cart';
  URL_UPDATE_CART='http://localhost:8080/cart/remove';

  constructor(private httpClient:HttpClient) { }

  insertCart(quantity: any, foodId: any, orderId: any):Observable<any> {
    return this.httpClient.get<any>(this.URL_INSERT_CART+'?quantity='+quantity+'&foodId='+foodId+'&orderId='+orderId)
  }

  getListCart(userId: any):Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL_INSERT_CART+'/list?userId='+userId)
  }

  removeCart(idFood:any):Observable<any> {
    return this.httpClient.get<any>(this.URL_UPDATE_CART+'?idFood='+idFood)
  }
}
