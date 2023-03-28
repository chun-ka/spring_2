import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../security/service/token.service';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private t:TokenService) {
  }

  ngOnInit(): void {
  }

}
