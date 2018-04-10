import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
// import { AuthService } from '../../services/auth.service';

// Interfaces
import { User } from '../../interfaces/user.interface';

// Services
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  forma: FormGroup;

  user: User = {
    name: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    language: '',
    role: ''
  };

  constructor(private _userService: UserService) {

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
      role: this.forma.value.role
  };

    this._userService.newUser(this.user)
      .subscribe(data => {
      console.log(data);
    });
    // console.log(this.forma.value);
    // this.auth.registerUser(this.forma.value);

  }

  resetRegisterForm() {
    console.log('reset');
    // this.forma.reset(this.user);
  }

}
