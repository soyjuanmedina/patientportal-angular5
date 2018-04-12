import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

// Interfaces
import { User } from '../interfaces/user.interface';

// Services
import { UserService } from "./user.service";
import { ResourceService } from "./resource.service";

@Injectable()
export class AuthService {

  firebaseURL: string = 'https://patient-portal-a6c57.firebaseio.com/';

  constructor(public router: Router,
    private http: HttpClient,
    private _userService: UserService,
    private _resourceService: ResourceService) { }

  loginUser(username, password){
    let url = this.firebaseURL + '/users.json?orderBy="email"&equalTo="' + username + '"';
    this.http.get(url)
      .subscribe(
      RES => {
        sessionStorage.setItem('dataPatient', JSON.stringify(RES[Object.keys(RES)[0]]));
        let userId = Object.keys(RES)[0];
        this._userService.getUser(userId);
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
  }

}
