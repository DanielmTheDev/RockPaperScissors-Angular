import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyLinkComponent } from './copy-link.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [CopyLinkComponent],
  exports: [CopyLinkComponent],
  imports: [
    CommonModule,
    ClipboardModule
  ]
})
export class CopyLinkModule { }
