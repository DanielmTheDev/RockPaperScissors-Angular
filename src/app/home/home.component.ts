import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { RoomCreationModalComponent } from "./room-creation-modal/room-creation-modal.component";

const WIDTH = '20rem';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(RoomCreationModalComponent, {
      width: WIDTH
    });
  }
}
