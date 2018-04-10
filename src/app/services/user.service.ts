import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

// Interfaces
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {

  firebaseURL: string = 'https://patient-portal-a6c57.firebaseio.com/users.json';

  constructor(private http: HttpClient) { }

  newUser(user: User){

    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type' : 'aplication/json'
    })

    return this.http.post(this.firebaseURL, body, { headers })
      .map(res => {
        console.log(res);
        return res;
      })

  }

}
