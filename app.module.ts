import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyAvVeCO7N4Qv3iZR5Uy0kNjmGeU22TYauM",
    authDomain: "bis-contacts.firebaseapp.com",
    databaseURL: "https://bis-contacts.firebaseio.com",
    storageBucket: "bis-contacts.appspot.com",
    messagingSenderId: "84867233786"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
