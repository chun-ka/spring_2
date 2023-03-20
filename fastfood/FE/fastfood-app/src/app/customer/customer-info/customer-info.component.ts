import { Component, OnInit } from '@angular/core';
import {User} from '../../entity/user/user';
import {LoginService} from '../../security/service/login.service';
import {TokenService} from '../../security/service/token.service';
import {Router} from '@angular/router';
import {ShareService} from '../../security/service/share.service';

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
  constructor(private login:LoginService,private token: TokenService,private router: Router,private share: ShareService) {
  }


  ngOnInit(): void {
    this.loader();
    this.share.getClickEvent().subscribe(() => {
      this.loader();
    })
  }

  loader() {
    this.isLogged = this.token.isLogger()
    if (this.isLogged) {
      // @ts-ignore
      this.login.profile(this.token.getUsername()).subscribe(next => {
        this.user = next;
        this.name = this.user.name;
      })
      this.role = this.token.getRole();
    }
  }
  logout() {
    this.role = 'none';
    this.name = 'Đăng nhập';
    this.isLogged = true;
    this.token.logout();
    this.router.navigateByUrl('/');
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
