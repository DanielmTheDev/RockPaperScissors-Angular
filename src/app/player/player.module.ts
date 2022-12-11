import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player.component';
import { SvgIconDirective } from './directives/svg-icon.directive';

@NgModule({
  declarations: [PlayerComponent, SvgIconDirective],
  imports: [
    CommonModule
  ],
  exports: [PlayerComponent]
})
export class PlayerModule {}
