import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {LoginService} from '../../security/service/login.service';
import {TokenService} from '../../security/service/token.service';
import {Router} from '@angular/router';
import {ShareService} from '../../security/service/share.service';
import {User} from '../../entity/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  name = 'Thông tin cá nhân';
  message = '';
  nameError = '';
  usernameError = '';
  emailError = '';
  passwordError = '';
  user:User={};
  role = 'none';

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false)
  });
  registerForm = new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    roles: new FormControl('customer')
  });

  isLogged = false;

  constructor(private title: Title, private loginService: LoginService, private token: TokenService, private router: Router, private share: ShareService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ');
    this.share.getClickEvent().subscribe(() => {
      this.loader();
    })
  }


  login() {
    this.loginService.login(this.form.value).subscribe(next => {

        if (this.form.controls.rememberMe.value) {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'local');
          this.ngOnInit();
        } else {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'session');
          this.ngOnInit();

        }
        this.share.sendClickEvent();
        // this.router.navigateByUrl('/')
        this.form.reset();
      this.role = this.token.getRole();
      console.log('trung'+this.role);
      if (this.role=='ROLE_ADMIN'){
        location.href=('http://localhost:4200/productAdmin');
      }
      }, error => {
        this.message = error.error.message;
      }
    );

  }

  ngDoCheck(): void {
    // this.isLogged = this.token.isLogger();
    // this.share.getClickEvent().subscribe(() => {
    //   this.loader();
    // })
  }


  home() {
    this.title.setTitle('Trang chủ');
  }

  menu() {
    this.title.setTitle('Menu');

  }

  about() {
    this.title.setTitle('Giới thiệu');

  }

  contact() {
    this.title.setTitle('Liên hệ');
  }

  searchByName(value: string) {
    if (value != '') {
      // this.searchName=value;
      this.share.sendClickEvent();
      this.router.navigate(['/menu', value]);
    }
  }

  loader() {
    this.isLogged = this.token.isLogger()
    if (this.isLogged) {
      // @ts-ignore
      this.loginService.profile(this.token.getUsername()).subscribe(next => {
        this.user = next;
      })
      this.role = this.token.getRole();
      console.log(this.role);
    }
  }
}
