import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToIconPipe } from './to-icon.pipe';

@NgModule({
  declarations: [ToIconPipe],
  exports: [
    ToIconPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
