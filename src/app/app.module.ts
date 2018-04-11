import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routes
import { AppRoutingModule } from './app.routes';

// Services
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { ResourceService } from "./services/resource.service";

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BookappointmentsComponent } from './components/bookappointments/bookappointments.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountinfoComponent } from './components/user/accountinfo/accountinfo.component';
import { MyappointmentsComponent } from './components/user/myappointments/myappointments.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BookappointmentsComponent,
    RegisterComponent,
    AccountinfoComponent,
    MyappointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthService,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
