import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { BookappointmentsComponent } from './components/bookappointments/bookappointments.component';
import { MyappointmentsComponent } from './components/user/myappointments/myappointments.component';
import { AccountinfoComponent } from './components/user/accountinfo/accountinfo.component';
import { RegisterComponent } from './components/register/register.component';

// Routes configuration
const appRoutes: Routes = [
  { path: 'bookappointments', component: BookappointmentsComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'myappointments',
    component: MyappointmentsComponent,

  },
  {
    path: 'accountinfo',
    component: AccountinfoComponent,

  },
  { path: '**', redirectTo: 'bookappointments', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}