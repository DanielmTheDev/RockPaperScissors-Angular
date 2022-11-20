import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpponentsComponent } from './components/opponents.component';
import { PlayerModule } from '../player/player.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OpponentsComponent],
  imports: [CommonModule, PlayerModule, MatIconModule],
  exports: [OpponentsComponent]
})
export class OpponentsModule {}
