import {Injectable} from '@angular/core';

const TOKEN = 'Token_key';
const ID = 'Id_key';
const ROLE = 'Role_key';
const STORAGE = 'Storage_key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  json = '';

  constructor() {
  }

  isLogger() {
    return !!this.getToken();
  }

  public setStorage(storage: string) {
    localStorage.removeItem(STORAGE);
    localStorage.setItem(STORAGE, storage);
    sessionStorage.removeItem(STORAGE);
    sessionStorage.setItem(STORAGE, storage);
  }

  public getStorage() {
    if (localStorage.getItem(STORAGE) == 'local' || sessionStorage.getItem(STORAGE) == 'local') {
      return localStorage.getItem(STORAGE);
    } else {
      return sessionStorage.getItem(STORAGE);
    }
  }


  public setToken(token: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
    } else {
      sessionStorage.removeItem(TOKEN);
      sessionStorage.setItem(TOKEN, token);
    }
  }

  public getToken() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(TOKEN);
    } else {
      return sessionStorage.getItem(TOKEN);
    }
  }

  public setId(id: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ID);
      localStorage.setItem(ID, id);
    } else {
      sessionStorage.removeItem(ID);
      sessionStorage.setItem(ID, id);
    }
  }

  public getId() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(ID);
    } else {
      return sessionStorage.getItem(ID);
    }
  }

  public setRole(role: string[]) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ROLE);
      localStorage.setItem(ROLE, JSON.stringify(role));
    } else {
      sessionStorage.removeItem(ROLE);
      sessionStorage.setItem(ROLE, JSON.stringify(role));
    }
  }

  public getRole(): string {
    if (this.getStorage() == 'local') {
      let roles = JSON.parse(<string> localStorage.getItem(ROLE));
      return roles[0].authority;
    } else {
      let roles = JSON.parse(<string> sessionStorage.getItem(ROLE));
      return roles[0].authority;
    }
  }

  rememberMe(token: string, id: string, roles: string[], storage: string) {
    this.setStorage(storage);
    this.setToken(token);
    this.setId(id);
    this.setRole(roles);
  }

  getCart() {
    let cartJson = localStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

  saveCart(carts:any){
    let cartJson=JSON.stringify(carts);
    localStorage.setItem('cart',cartJson);
  }

  getTotalQuantity(){
    let carts=this.getCart();
    let total:number=0;
    carts.forEach((item:any)=>{
      total+=item.quantity;
    });
    return total;
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
