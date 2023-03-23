import { Component, OnInit } from '@angular/core';
import {User} from '../../entity/user/user';
import {LoginService} from '../../security/service/login.service';
import {TokenService} from '../../security/service/token.service';
import {Router} from '@angular/router';
import {ShareService} from '../../security/service/share.service';
import {Title} from '@angular/platform-browser';
import {HeaderComponent} from '../../home/header/header.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  user: User={};
  role = 'none';
  name: string | undefined = 'Đăng nhập'
  isLogged = false;
  constructor(private login:LoginService,private token: TokenService,private router: Router,private share: ShareService,private title:Title) {
  }


  ngOnInit(): void {
    this.title.setTitle('Trang cá nhân')
    this.loader();
    console.log(123);
    this.share.getClickEvent().subscribe(data=>{
      this.loader();
      console.log('data'+data);
    })
  }

  loader() {
    this.isLogged = this.token.isLogger()
    if (this.isLogged) {
      console.log(this.isLogged);
      // @ts-ignore
      this.login.profile(this.token.getUsername()).subscribe(next => {
        this.user = next;
        console.log(next);
        this.name = this.user.name;
      })
      this.role = this.token.getRole();
    }
  }
  logout() {
    this.token.logout();
    this.title.setTitle('Trang chủ');
    this.router.navigateByUrl('/');
    location.href=('/');
  }



  checkProfile() {
    if (!this.isLogged) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/profile')
    }
  }
  search1(value: string) {

    this.share.sendClickEvent()
    this.router.navigate(['home', value])
  }

}
