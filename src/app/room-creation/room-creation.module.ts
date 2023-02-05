import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RoomCreationModalComponent } from './components/room-creation-modal/room-creation-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [RoomCreationModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [RoomCreationModalComponent]
})
export class RoomCreationModule {}
