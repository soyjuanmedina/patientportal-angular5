import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styles: []
})
export class MyappointmentsComponent implements OnInit {

  selectedSlotToCancel: any;

  constructor(private _userService: UserService) { 
  }

  deleteAppointment(){
    console.log(this._userService.user.appointments);
    this._userService.user.appointments.splice(this.selectedSlotToCancel, 1);
    console.log(this._userService.user.appointments);
    this._userService.updateUser(this._userService.user).subscribe();
  }

  selectSlotToCancel(slot, index){
    this.selectedSlotToCancel = index;
  }

  ngOnInit() {
  }

}
