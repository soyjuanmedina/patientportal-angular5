import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

// Interfaces
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {

  firebaseURL: string = 'https://patient-portal-a6c57.firebaseio.com/';
  user: any;

  constructor(public router: Router,
    private http: HttpClient) { }

  getUser(id){
    console.log(id);
    let url = this.firebaseURL + '/users/' + id + '.json';
    this.http.get(url)
    .subscribe(
    RES => {
        sessionStorage.setItem('dataPatient', JSON.stringify(RES));
        this.user = RES;
        this.router.navigate(['/myappointments']);
        console.log(this.user);
      },
      response => {
      },
      () => {
        // Somthing to do when the observable is completed.');
      }
    );
  }

  doLogout(){
    delete this.user;
  }

  newUser(user: User){

    let url = this.firebaseURL + 'users.json';
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type' : 'aplication/json'
    })

    return this.http.post(url, body, { headers })
      .map(res => {
        console.log(res);
        return res;
      })

  }

}
