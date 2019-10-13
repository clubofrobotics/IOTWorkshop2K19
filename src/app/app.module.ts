import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegComponent } from './reg/reg.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {RegServiceService} from '../app/services/reg-service.service'



@NgModule({
  declarations: [
    AppComponent,
    RegComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'IOTWorkshop2K19'),
    AngularFirestoreModule
  ],
  providers: [
    RegServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
