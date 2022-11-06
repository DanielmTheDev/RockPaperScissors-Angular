import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomComponent } from './room.component';
import { PlayerCreationModule } from '../player-creation/player-creation.module';
import { ChoiceModule } from '../choice/choice.module';
import { OpponentsModule } from '../opponents/opponents.module';

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    PlayerCreationModule,
    OpponentsModule,
    ChoiceModule
  ],
  exports: [RoomComponent]
})
export class RoomModule {}
