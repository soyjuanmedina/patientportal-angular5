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
    private http: HttpClient) {
    if (typeof sessionStorage.dataPatient != 'undefined') {
      this.user = JSON.parse(sessionStorage.getItem('dataPatient'));
    }
  }

  getUser(id){
    let url = this.firebaseURL + '/users/' + id + '.json';
    this.http.get(url)
    .subscribe(
      RES => {
        this.user = RES;
        this.user.id = id;
        if (!this.user.appointments) {
          this.user.appointments = [];
        }
        sessionStorage.setItem('dataPatient', JSON.stringify(this.user));
        // this.router.navigate(['/myappointments']);
      },
        response => {
      },
        () => {
          // Somthing to do when the observable is completed.');
        }
    );
  }

  chekIfUserExists(email){

    let url = this.firebaseURL + '/users.json?orderBy="email"&equalTo="' + email + '"';
    return this.http.get(url)
      .map(res => res)
  }

  updateMyAppointments(selectedFreeslot){
    if(!this.user.appointments){
      this.user.appointments = [];
    }
    this.user.appointments.push(selectedFreeslot);
    sessionStorage.setItem('dataPatient', JSON.stringify(this.user));
    this.updateUser(this.user)
      .subscribe();
  }

  updateUser(user: User) {
    let url = this.firebaseURL + 'users/' + this.user.id + '.json';
    let body = JSON.stringify(user);
    console.log(body);
    let headers = new HttpHeaders({
      'Content-Type': 'aplication/json'
    })
    return this.http.put(url, body, { headers })
      .map(res => {
        console.log(res);
        return res;
      })
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
        return res;
      })

  }

}
