import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import constants from '../constants';
import { RoomCreationModalComponent } from '../room-creation/room-creation-modal/room-creation-modal.component';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(RoomCreationModalComponent, {
      width: constants.dialogWidth
    });
  }
}
