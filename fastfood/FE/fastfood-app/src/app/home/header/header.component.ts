import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {LoginService} from '../../security/service/login.service';
import {TokenService} from '../../security/service/token.service';
import {Router} from '@angular/router';
import {ShareService} from '../../security/service/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = 'Thông tin cá nhân';
  message = ''
  nameError = '';
  usernameError = '';
  emailError = '';
  passwordError = '';

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(true)
  })
  registerForm = new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    roles: new FormControl('customer')
  });
  islogged = false;
  constructor(private title:Title,private loginService: LoginService, private token: TokenService, private router: Router, private share: ShareService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ');
    this.islogged = this.token.isLogger();
    if (this.islogged) {
      this.router.navigateByUrl('/')
    }
  }

  login() {
    this.loginService.login(this.form.value).subscribe(next => {
        if (this.form.controls.rememberMe.value) {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'local');

        } else {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'session');
        }
        this.share.sendClickEvent();
        // this.router.navigateByUrl('/')
      this.form.reset();
      }, error => {
        this.message = error.error.message
      }
    )
  }

}
