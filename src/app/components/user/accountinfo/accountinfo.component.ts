import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { UserService } from "../../../services/user.service";


@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html',
})
export class AccountinfoComponent implements OnInit {

  user;
  formaMail: FormGroup;
  formaPass: FormGroup;
  alert;

  constructor(private _userService: UserService) {
    this.user = this._userService.user;

    this.formaMail = new FormGroup({
      'email': new FormControl('', [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      'confirmemail': new FormControl(),
    });

    this.formaPass = new FormGroup({
      'password': new FormControl({ value: 'demo', disabled: true }),
      'confirmpassword': new FormControl({ value: 'demo', disabled: true }),
    });

    this.formaPass.controls['confirmpassword'].setValidators([
      this.notEqualPassword.bind(this.formaPass)
    ]);

    this.formaMail.controls['confirmemail'].setValidators([
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
      this.notEqualMail.bind(this.formaMail)
    ]);
  }

  changePass() {
    console.log(this.formaPass.controls);

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

  changeMail(){
    this.user.email = this.formaMail.controls.email.value;
    this._userService.updateUser(this.user)
      .subscribe(data => {
        this.alert = 'Your email has been updated'
        // this.router.navigate(['accountinfo']);
      },
        error => console.log(error)
      );
  }

  ngOnInit() {
    delete this.alert;
  }

}
