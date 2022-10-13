import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { RoomModule } from './room/room.module';
import { FirebaseModule } from './firebase/firebase.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    RoomModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
