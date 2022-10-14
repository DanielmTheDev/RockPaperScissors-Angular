import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomComponent } from './room.component';
import { PlayerCreationModule } from '../player-creation/player-creation.module';

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    PlayerCreationModule
  ],
  exports: [RoomComponent]
})
export class RoomModule {}
