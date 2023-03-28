import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../entity/user/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_USER='http://localhost:8080/user';
  constructor(private httpClient:HttpClient) { }

  getUserById(id: number):Observable<any> {
    return this.httpClient.get<any>(this.URL_USER+'/'+id);
  }

  updateUser(user: User) {
    return this.httpClient.put(this.URL_USER,user);
  }
}
