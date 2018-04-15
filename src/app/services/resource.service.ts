import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResourceService {

  firebaseURL = 'https://patient-portal-a6c57.firebaseio.com/';
  selectedFreeslot: any;
  languages = [];
  roles = [{id:1, name:'luis'},{id:5, name:'lasd'}];
  defaultLanguage;

  constructor(public http: HttpClient) {

    this.getResource('languages')
      .subscribe(data => {
        for (let x in data) {
          if (data[x] != null) {
            this.languages.push(data[x]);
          }
        }
        this.defaultLanguage = this.languages[0].id;
        console.log(this.defaultLanguage);
      });

/*     this.getResource('roles')
    .subscribe(data => {
      for (let x in data) {
        if (data[x] != null) {
          this.roles.push(data[x]);
        }
      }
    }); */

   }

  getResource(id){
    let url = this.firebaseURL + id + '.json';
    return this.http.get(url)
    .map(res => res);
  }


  getNodofromResourceId(nodo, resource, id){
    let url = this.firebaseURL + resource + '/' + id + '/' + nodo + '.json';
    return this.http.get(url)
      .map(res => res);
  }

}
