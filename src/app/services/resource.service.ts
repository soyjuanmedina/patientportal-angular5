import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResourceService {

  firebaseURL: string = 'https://patient-portal-a6c57.firebaseio.com/';
  selectedFreeslot: any;

  constructor(public http: HttpClient) { }

  getResource(id){
    let url = this.firebaseURL + id + '.json';
    return this.http.get(url)
    .map(res => res)
  }


  getNodofromResourceId(nodo, resource, id){
    let url = this.firebaseURL + resource + '/' + id + '/' + nodo + '.json';
    return this.http.get(url)
      .map(res => res)
  }

}
