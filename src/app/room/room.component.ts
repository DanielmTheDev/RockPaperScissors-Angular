import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from './models/player';
import constants from '../constants';
import { PlayerCreationModalComponent } from './player-creation-modal/player-creation-modal.component';
import { FirebasePlayerService } from '../firebase/firebase-player.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  player = {} as Player;
  allPlayers$: Observable<Player[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public playerService: FirebasePlayerService) {}

  ngOnInit(): void {
    this.allPlayers$ = this.playerService.valueChanges();
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

  private persistPlayer(name: string): void {
    this.player = this.initializeBasicPlayer(name);
    this.playerService.add(this.player).then(playerId => {
      this.player.id = playerId;
      localStorage.setItem(constants.playerKey, JSON.stringify(this.player));
    });
  }

  private initializeBasicPlayer(name: string) {
    return {
      name: name,
      room: this.route.snapshot.params[constants.routeParams.id]
    } as Player;
  }
}
