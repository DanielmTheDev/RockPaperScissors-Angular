import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoomCreationModule } from '../room-creation/room-creation.module';


@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RoomCreationModule
  ]
})
export class HomeModule {}
