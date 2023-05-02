import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoomCreationModule } from '../room-creation/room-creation.module';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
    imports: [
        BrowserModule,
        RoomCreationModule,
        MatButtonModule,
        NgOptimizedImage
    ]
})
export class HomeModule {}
