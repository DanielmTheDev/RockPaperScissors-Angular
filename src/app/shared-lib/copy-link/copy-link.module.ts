import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyLinkComponent } from './copy-link.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CopyLinkComponent],
  exports: [CopyLinkComponent],
  imports: [
    CommonModule,
    ClipboardModule,
    MatButtonModule
  ]
})
export class CopyLinkModule { }
