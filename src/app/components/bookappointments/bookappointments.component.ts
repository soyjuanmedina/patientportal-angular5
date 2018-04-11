import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemJsNgModuleLoaderConfig } from '@angular/core/src/linker/system_js_ng_module_factory_loader';
// import * as moment from 'moment';

// Services
import { ResourceService } from "../../services/resource.service";


@Component({
  selector: 'app-bookappointments',
  templateUrl: './bookappointments.component.html',
})
export class BookappointmentsComponent {

  patient;

  hospitals = [];
  payors = [];
  departments = [];
  doctors = [];
  specialties = [];
  dates;
  freeslots;
  selectedFreeslot;

  searchterms: any = {
    hospitalId: null,
    payorId: null,
    departmentId: null,
    doctorId: null,
    specialtyId: null,
    // date: moment().add(1, 'days').format('YYYY-MM-DD'),
  };


  constructor(private _resourceService: ResourceService) {
    this._resourceService.getResource('hospitals')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null){
            this.hospitals.push(data[x]);
          }  
        }
      });

    this._resourceService.getResource('payors')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.payors.push(data[x]);
          }
        }
      });
  }

  searchFreeSlots(){
    console.log(this.searchterms);
  }

  searchDepartments(){
    this.departments = [];
    this._resourceService.getNodofromResourceId('departments', 'hospitals', this.searchterms.hospitalId)
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.departments.push(data[x]);
          }
        }
      });
  }

}
