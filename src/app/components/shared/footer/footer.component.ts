import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../appSettings';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  NAME = AppSettings.NAME;
  ADDRESS = AppSettings.ADDRESS;
  PHONE = AppSettings.PHONE;
  EMAIL = AppSettings.EMAIL;
  

  constructor() { }

  ngOnInit() {


  }

}
