import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../../../appSettings';
declare var $:any; // TODO hide modal in othe way

// Services
import { UserService } from "../../../services/user.service";
import { AuthService } from "../../../services/auth.service";
import { ResourceService } from "../../../services/resource.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  login: any = {
    username: null,
    password: null,
  };


  LOGO = AppSettings.LOGO;
  alert: string;

  constructor(public router: Router,
    public _userService: UserService,
    public _authService: AuthService,
    public _resourceService: ResourceService) {
  }

  ngOnInit() {
  }

  doLogin() {
    if (this.login.password !=='12345'){
      this.alert="Remember in the demo site the password is always '12345'";
    }else{
      this._authService.loginUser(this.login.username, this.login.password);
      delete this.alert;
      $('#LoginModal').modal('hide');
      if (this._resourceService.selectedFreeslot){
        $('#FreeSlotModal').modal('show');

      }
    }
  }

  logout() {
    this._authService.logout();
  }

}
