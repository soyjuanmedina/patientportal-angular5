import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

// Interfaces
import { User } from '../../interfaces/user.interface';

// Services
import { UserService } from "../../services/user.service";
import { ResourceService } from "../../services/resource.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  alert: string;
  message: string;

  forma: FormGroup;

  languages = [];
  roles = [];

  user: User = {
    name: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    language: '',
    role: '',
    appointments: []
  };

  constructor(private _userService: UserService,
    private _resourceService: ResourceService,
    private router: Router) {

    this.forma = new FormGroup({

      'name': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      'password': new FormControl({ value: 'demo', disabled: true }),
      'confirmpassword': new FormControl({ value: 'demo', disabled: true }),
      'phoneNumber': new FormControl('', Validators.required),
      'language': new FormControl,
      'role': new FormControl,
    });

    this._resourceService.getResource('languages')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.languages.push(data[x]);
          }
        }
      });

    this._resourceService.getResource('roles')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.roles.push(data[x]);
          }
        }
      });
  }

  ngOnInit() {
    delete this.alert;
  }


  notEqualPassword(control: FormControl): { [s: string]: boolean } {

    // console.log(this);
    let forma: any = this;

    if (control.value !== forma.controls['password'].value) {
      return {
        notEqualsPass: true
      }
    }

    return null;

  }

  notEqualMail(control: FormControl): { [s: string]: boolean } {

    // console.log(this);
    let forma: any = this;

    if (control.value !== forma.controls['email'].value) {
      return {
        notEqualsMail: true
      }
    }

    return null;

  }


  registerUser() {

    this.user = {
      name: this.forma.value.name,
      lastname: this.forma.value.lastname,
      email: this.forma.value.email,
      phoneNumber: this.forma.value.phoneNumber,
      language: this.forma.value.language,
      role: this.forma.value.role,
      appointments: []
      
  };

    this._userService.chekIfUserExists(this.user.email).subscribe(
      res =>{
        console.log(Object.keys(res).length);
        if (!Object.keys(res).length){
          this._userService.newUser(this.user)
            .subscribe(data => {
              this.message = 'Thanks for register. Now you can Login'
              // this.router.navigate(['accountinfo']);
            },
              error => console.log(error)
            );
        }else{
          this.alert = 'The user is already register';
        }
      }
    );

    
    // console.log(this.forma.value);
    // this.auth.registerUser(this.forma.value);

  }

  resetRegisterForm() {
    console.log('reset');
    // this.forma.reset(this.user);
  }

}
