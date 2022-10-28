import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceComponent } from './components/choice/choice.component';

@NgModule({
  declarations: [ChoiceComponent],
  imports: [CommonModule],
  exports: [ChoiceComponent]
})
export class ChoiceModule {}
