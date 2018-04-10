import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../../../appSettings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  login: any = {
    username: null,
    password: null,
  };

  auth: any = {
    user: null,
    password: null,
  };

  LOGO = AppSettings.LOGO;
  user: any;
  alert: string;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  doLogin() {
    // this.auth.login(this.login);
    this.login = {
      username: null,
      password: null,
    };

  }

  logout() {
    // this.auth.logout();
  }

}
