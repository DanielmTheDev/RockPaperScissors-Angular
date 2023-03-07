import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpponentsComponent } from './components/opponents.component';
import { PlayerModule } from '../player/player.module';
import { MatIconModule } from '@angular/material/icon';
import { OpponentComponent } from './components/opponent.component';
import { DirectivesModule } from '../shared-lib/directives/directives.module';

@NgModule({
  declarations: [OpponentsComponent, OpponentComponent],
  imports: [CommonModule, PlayerModule, MatIconModule, DirectivesModule],
  exports: [OpponentsComponent, OpponentComponent]
})
export class OpponentsModule {}
