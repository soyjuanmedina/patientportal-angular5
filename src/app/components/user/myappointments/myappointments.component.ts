import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styles: []
})
export class MyappointmentsComponent implements OnInit {

  c: any;
  selectedSlotToCancel: any;

  constructor(public _userService: UserService) {
  }

  deleteAppointment(){
    this._userService.user.appointments.splice(this.selectedSlotToCancel, 1);
    this._userService.updateUser(this._userService.user).subscribe();
  }

  selectSlotToCancel(slot, index){
    this.selectedSlotToCancel = slot;
  }

  ngOnInit() {
  }

}
