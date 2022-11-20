import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomComponent } from './room.component';
import { PlayerCreationModule } from '../player-creation/player-creation.module';
import { ChoiceModule } from '../choice/choice.module';
import { OpponentsModule } from '../opponents/opponents.module';
import { CopyLinkComponent } from './copy-link/copy-link.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { PlayerModule } from '../player/player.module';

@NgModule({
  declarations: [RoomComponent, CopyLinkComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    PlayerCreationModule,
    OpponentsModule,
    ChoiceModule,
    ClipboardModule,
    MatButtonModule,
    PlayerModule
  ],
  providers: [MatSnackBar],
  exports: [RoomComponent]
})
export class RoomModule {}
