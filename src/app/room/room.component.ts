import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from './models/player';
import constants from '../constants';
import { PlayerCreationModalComponent } from './player-creation-modal/player-creation-modal.component';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  player: Player | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const serializedPlayer = localStorage.getItem(constants.playerKey);
    if (serializedPlayer) {
      this.player = JSON.parse(serializedPlayer);
    } else {
      this.createPlayer();
    }
  }

  leaveRoom(): void {
    localStorage.removeItem(constants.playerKey);
    this.router.navigate(['']).then();
  }

  private createPlayer(): void {
    const dialogRef = this.dialog.open(PlayerCreationModalComponent, {
      width: constants.dialogWidth,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(name => this.persistPlayer(name));
  }

  // this persistence would probably be better with ngrx
  private persistPlayer(name: string): void {
    this.player = {
      name: name,
      id: 'random-id',
      room: this.route.snapshot.params['id']
    } as Player;
    localStorage.setItem(constants.playerKey, JSON.stringify(this.player));
  }
}
