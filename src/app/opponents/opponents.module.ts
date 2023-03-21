import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpponentsComponent } from './components/opponents.component';
import { MatIconModule } from '@angular/material/icon';
import { OpponentComponent } from './components/opponent.component';
import { DirectivesModule } from '../shared-lib/directives/directives.module';
import { ResultCountComponent } from './components/result-count/result-count.component';
import { PlayerComponent } from './components/player.component';
import { PipesModule } from '../shared-lib/pipes/pipes.module';
import { ChoiceModule } from '../choice/choice.module';

@NgModule({
  declarations: [OpponentsComponent, OpponentComponent, ResultCountComponent, PlayerComponent],
  imports: [CommonModule, MatIconModule, DirectivesModule, PipesModule, ChoiceModule],
  exports: [OpponentsComponent, OpponentComponent, PlayerComponent]
})
export class OpponentsModule {}
