import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeInnerHtmlDirective } from './safe-inner-html.directive';

@NgModule({
  declarations: [SafeInnerHtmlDirective],
  imports: [CommonModule],
  exports: [SafeInnerHtmlDirective]
})
export class DirectivesModule { }
