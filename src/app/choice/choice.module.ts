import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceComponent } from './components/choice/choice.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ChoiceComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ChoiceComponent]
})
export class ChoiceModule {}
