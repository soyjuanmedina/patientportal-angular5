import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';

// Interfaces
import { UserInterface } from '../interfaces/index.interface';

// Services
import { UserService } from "./user.service";
import { ResourceService } from "./resource.service";

@Injectable()
export class AuthService {

  firebaseURL = 'https://patient-portal-a6c57.firebaseio.com/';

  constructor(public router: Router,
    public http: HttpClient,
    public _userService: UserService,
    public _resourceService: ResourceService,
    public translate: TranslateService) { }

  loginUser(username, password){
    let url = this.firebaseURL + '/users.json?orderBy="email"&equalTo="' + username + '"';
    this.http.get(url)
      .subscribe(
      RES => {
        if (!Object.keys(RES).length){
          this._userService.danger = "The user don't exits, please register it";
        } else{
          delete this._userService.danger;
          if (this._resourceService.selectedFreeslot){
            this.router.navigate(['/bookappointments']);
          } else{
            this.router.navigate(['/myappointments']);
          }
          sessionStorage.setItem('dataPatient', JSON.stringify(RES[Object.keys(RES)[0]]));
          let userId = Object.keys(RES)[0];
          this._userService.getUser(userId);
        }
      },
      response => {
      },
      () => {
        // Somthing to do when the observable is completed.');
      }
    );
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/bookappointments']);
    delete this._resourceService.selectedFreeslot;
    this._userService.doLogout();
    this.translate.use(this._resourceService.defaultLanguage);
  }

}
