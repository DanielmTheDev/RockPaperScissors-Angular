import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player.component';
import { SafeInnerHtmlDirective } from './directives/safe-inner-html.directive';

@NgModule({
  declarations: [PlayerComponent, SafeInnerHtmlDirective],
  imports: [
    CommonModule
  ],
  exports: [PlayerComponent]
})
export class PlayerModule {}
