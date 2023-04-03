import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartDto} from '../dto/cart-dto';
import {Total} from '../dto/total';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  URL_INSERT_CART = 'http://localhost:8080/cart/insert';
  URL_CART = 'http://localhost:8080/cart/info';
  URL_CART_LIST = 'http://localhost:8080/cart/list';
  URL_CART_QUANTITY = 'http://localhost:8080/cart/quantity';
  URL_REMOVE_CART = 'http://localhost:8080/cart/remove';
  URL_UPDATE_CART = 'http://localhost:8080/cart/update';

  constructor(private httpClient: HttpClient) {
  }

  insertCart(quantity: any, foodId: any, orderId: any): Observable<any> {
    return this.httpClient.get<any>(this.URL_INSERT_CART + '?quantity=' + quantity + '&foodId=' + foodId + '&orderId=' + orderId);
  }

  getListCart(userId: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL_CART_LIST + '?userId=' + userId);
  }

  removeCart(idFood: any): Observable<any> {
    return this.httpClient.get<any>(this.URL_REMOVE_CART + '?idFood=' + idFood);
  }

  getCart(foodId: any, orderId: any): Observable<any> {
    return this.httpClient.get<any>(this.URL_CART + '?foodId=' + foodId + '&orderId=' + orderId);

  }

  updateCart(quantity: any, foodId: any, orderId: any) {
    return this.httpClient.get<any>(this.URL_UPDATE_CART + '?quantity=' + quantity + '&foodId=' + foodId + '&orderId=' + orderId);
  }

  getTotalQuantity(userId: any): Observable<Total> {
    return this.httpClient.get<Total>(this.URL_CART_QUANTITY + '?userId=' + userId);
  }

}
