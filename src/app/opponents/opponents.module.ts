import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpponentsComponent } from './components/opponent/opponents.component';
import { MatIconModule } from '@angular/material/icon';
import { OpponentComponent } from './components/opponent/opponent.component';
import { DirectivesModule } from '../shared-lib/directives/directives.module';
import { ResultCountComponent } from './components/result-count/result-count.component';
import { PlayerComponent } from './components/player/player.component';
import { PipesModule } from '../shared-lib/pipes/pipes.module';
import { ChoiceModule } from '../choice/choice.module';
import { CrossOutComponent } from './components/cross-out/cross-out.component';
import { ChoiceMadeComponent } from './components/choice-made/choice-made.component';

@NgModule({
  declarations: [OpponentsComponent, OpponentComponent, ResultCountComponent, PlayerComponent, CrossOutComponent, ChoiceMadeComponent],
  imports: [CommonModule, MatIconModule, DirectivesModule, PipesModule, ChoiceModule],
  exports: [OpponentsComponent, OpponentComponent, PlayerComponent]
})
export class OpponentsModule {}
