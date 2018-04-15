import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemJsNgModuleLoaderConfig } from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import * as moment from 'moment';

// Services
import { ResourceService } from "../../services/resource.service";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-bookappointments',
  templateUrl: './bookappointments.component.html',
})
export class BookappointmentsComponent {

  patient;

  dates;
  freeslots = [];

  searchterms: any = {
    hospitalId: null,
    payorId: null,
    departmentId: null,
    doctorId: null,
    specialtyId: null,
    date: moment().add(1, 'days').format('YYYY-MM-DD')
  };


  constructor(public router: Router,
    public _resourceService: ResourceService,
    public _userService: UserService) {
  }

  searchFreeSlots(){
    this._resourceService.getResource('freeslots')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.freeslots.push(data[x]);
          }
        }
      });
  }

  searchDoctors(){
    this._resourceService.searchDoctors(this.searchterms.departmentId);
  }

  sendFreeslot(freeslot) {
    this._resourceService.selectedFreeslot = freeslot;
  }

  bookSlot(selectedFreeslot){
    this._userService.user.appointments.push(selectedFreeslot);
    this._userService.updateUser(this._userService.user).subscribe( data=> {
      this.router.navigate(['/myappointments'])
    });
  }

  reset() {
    this.searchterms = {
      hospitalId: null,
      payorId: null,
      departmentId: null,
      doctorId: null,
      specialtyId: null,
      date: moment().add(1, 'days').format('YYYY-MM-DD'),
    };
    this.freeslots = [];
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

}
