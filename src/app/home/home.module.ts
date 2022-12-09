import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoomCreationModule } from '../room-creation/room-creation.module';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
    imports: [
        BrowserModule,
        RoomCreationModule,
        MatButtonModule
    ]
})
export class HomeModule {}
