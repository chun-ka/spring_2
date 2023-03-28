import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../entity/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL_INSERT_USER='http://localhost:8080/order/user';
  URL_LIST_ORDER='http://localhost:8080/order';
  URL_CART_ORDER='http://localhost:8080/order/cart';
  constructor(private httpClient:HttpClient) {}

  insertUser(userId: any):Observable<any> {
    return this.httpClient.get<any>(this.URL_INSERT_USER+'?userId='+userId)
  }

  getListOrder():Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.URL_LIST_ORDER);
  }

  getCartOrder():Observable<Order> {
    return this.httpClient.get<Order>(this.URL_CART_ORDER);
  }
}
