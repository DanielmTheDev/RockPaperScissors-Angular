import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayerCreationModule } from '../player-creation/player-creation.module';
import { ChoiceModule } from '../choice/choice.module';
import { OpponentsModule } from '../opponents/opponents.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { RoomComponent } from './components/room.component';
import { SpinnerModule } from '../shared-lib/spinner/spinner.module';
import { CopyLinkModule } from '../shared-lib/copy-link/copy-link.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RoomComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        PlayerCreationModule,
        OpponentsModule,
        ChoiceModule,
        ClipboardModule,
        MatButtonModule,
        SpinnerModule,
        CopyLinkModule,
        MatIconModule
    ],
  providers: [MatSnackBar],
  exports: [RoomComponent]
})
export class RoomModule {}
