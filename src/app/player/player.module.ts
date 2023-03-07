import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player.component';
import { DirectivesModule } from '../shared-lib/directives/directives.module';

@NgModule({
  declarations: [PlayerComponent],
  imports: [CommonModule, DirectivesModule],
  exports: [PlayerComponent]
})
export class PlayerModule {}
