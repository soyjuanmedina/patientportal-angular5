import { Component, OnInit } from '@angular/core';

// Animations
import { trigger, state, style, animate, transition, keyframes} from '@angular/animations';

// Services
import { UserService } from "../../../services/index.service";

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  animations: [
    trigger('divState', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(1000, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(500, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ],
})
export class MyappointmentsComponent implements OnInit {

  indexToCancel: number;
  selectedSlotToCancel: any;

  constructor(public _userService: UserService) {
  }

  deleteAppointment(){
    console.log(this.indexToCancel);
    this._userService.user.appointments.splice(this.indexToCancel, 1);
    this._userService.updateUser(this._userService.user).subscribe();
  }

  selectSlotToCancel(slot, index){
    this.indexToCancel = index;
    this.selectedSlotToCancel = slot;
  }

  ngOnInit() {
  }

}
