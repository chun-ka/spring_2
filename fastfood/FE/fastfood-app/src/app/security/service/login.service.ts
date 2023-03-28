import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username = ''
  constructor(private http: HttpClient,private tokenService:TokenService) { }

  login(obj: { username: any; password: any; }): Observable<any> {
    return this.http.post('http://localhost:8080/api/login',{username: obj.username,password: obj.password})
  }

}
