import {Injectable} from '@angular/core';
import {Cart} from '../../entity/cart/cart';

const TOKEN = 'Token_key';
const ID = 'Id_key';
const NAME = 'Name_key';
const USERNAME = 'Username_key';
const PHONENUMBER = 'PhoneNumber';
const EMAIL = 'Email_key';
const ADDRESS = 'Address_key';
const AGE = 'Age_key';
const GENDER = 'Gender_key';
const DATEOFBIRTH = 'DateOfBirth_key';
const AVATAR = 'Avatar_key';
const ROLE = 'Role_key';
const STORAGE = 'Storage_key';
const CART = 'Cart_key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  json = '';
  // cart: Cart[] = [];

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
    // this.setCart(this.cart);
    if (localStorage.getItem(STORAGE) == 'local' || sessionStorage.getItem(STORAGE) == 'local') {
      return localStorage.getItem(STORAGE);
    } else {
      return sessionStorage.getItem(STORAGE);
    }
  }

  // public setCart(cart: Cart[]) {
  //   sessionStorage.removeItem(CART);
  //   sessionStorage.setItem(CART, JSON.stringify(cart));
  // }

  // public upQuantity(id: number, carts: Cart[]) {
  //   for (let i = 0; i < carts.length; i++) {
  //     if (carts[i].id == id) {
  //       // @ts-ignore
  //       carts[i].quantity += 1;
  //       break;
  //     }
  //   }
  // }

  // public checkExist(name: string) {
  //   console.log(name);
  //   // let cart = this.getCart();
  //   for (let i = 0; i < this.getCart().length; i++) {
  //     if (this.getCart()[i].name == name) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // public getCart() {
  //   const carts = sessionStorage.getItem(CART);
  //   if (carts == 'undefined') {
  //     return this.cart;
  //   } else {
  //     // @ts-ignore
  //     this.cart = JSON.parse(carts);
  //     return this.cart;
  //   }
  //
  //
  // }

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

  public setName(name: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(NAME);
      localStorage.setItem(NAME, name);
    } else {
      sessionStorage.removeItem(NAME);
      sessionStorage.setItem(NAME, name);
    }
  }

  public getName() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(NAME);
    } else {
      return sessionStorage.getItem(NAME);
    }
  }

  public setUsername(username: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(USERNAME);
      localStorage.setItem(USERNAME, username);
    } else {
      sessionStorage.removeItem(USERNAME);
      sessionStorage.setItem(USERNAME, username);
    }
  }

  public getUsername() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(USERNAME);
    } else {
      return sessionStorage.getItem(USERNAME);
    }
  }

  public setPhoneNumber(number: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(PHONENUMBER);
      localStorage.setItem(PHONENUMBER, number);
    } else {
      sessionStorage.removeItem(PHONENUMBER);
      sessionStorage.setItem(PHONENUMBER, number);
    }
  }

  public getPhoneNumber() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(PHONENUMBER);
    } else {
      return sessionStorage.getItem(PHONENUMBER);
    }
  }

  public setEmail(email: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(EMAIL);
      localStorage.setItem(EMAIL, email);
    } else {
      sessionStorage.removeItem(EMAIL);
      sessionStorage.setItem(EMAIL, email);
    }
  }

  public getEmail() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(EMAIL);
    } else {
      return sessionStorage.getItem(EMAIL);
    }
  }

  public setAge(age: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(AGE);
      localStorage.setItem(AGE, age);
    } else {
      sessionStorage.removeItem(AGE);
      sessionStorage.setItem(AGE, age);
    }
  }

  public getAge() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(AGE);
    } else {
      return sessionStorage.getItem(AGE);
    }
  }

  public setAddress(address: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ADDRESS);
      localStorage.setItem(ADDRESS, address);
    } else {
      sessionStorage.removeItem(ADDRESS);
      sessionStorage.setItem(ADDRESS, address);
    }
  }

  public getAddress() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(ADDRESS);
    } else {
      return sessionStorage.getItem(ADDRESS);
    }
  }


  public setGender(gender: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(GENDER);
      localStorage.setItem(GENDER, gender);
    } else {
      sessionStorage.removeItem(GENDER);
      sessionStorage.setItem(GENDER, gender);
    }
  }

  public getGender() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(GENDER);
    } else {
      return sessionStorage.getItem(GENDER);
    }
  }

  public setDateOfBirth(date: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(DATEOFBIRTH);
      localStorage.setItem(DATEOFBIRTH, date);
    } else {
      sessionStorage.removeItem(DATEOFBIRTH);
      sessionStorage.setItem(DATEOFBIRTH, date);
    }
  }

  public getDateOfBirth() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(DATEOFBIRTH);
    } else {
      return sessionStorage.getItem(DATEOFBIRTH);
    }
  }

  public setAvatar(avatar: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(AVATAR);
      localStorage.setItem(AVATAR, avatar);
    } else {
      sessionStorage.removeItem(AVATAR);
      sessionStorage.setItem(AVATAR, avatar);
    }
  }

  public getAvatar() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(AVATAR);
    } else {
      return sessionStorage.getItem(AVATAR);
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

  rememberMe(token: string, id: string, name: string, username: string, phonenumber: string, email: string, address: string, age: string, gender: string, dateOfBirth: string, avatar: string, roles: string[], storage: string) {
    this.setStorage(storage);
    this.setToken(token);
    this.setId(id);
    this.setName(name);
    this.setUsername(username);
    this.setPhoneNumber(phonenumber);
    this.setEmail(email);
    this.setAddress(address);
    this.setAge(age);
    this.setGender(gender);
    this.setDateOfBirth(dateOfBirth);
    this.setAvatar(avatar);
    this.setRole(roles);
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
