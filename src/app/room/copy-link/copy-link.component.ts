import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.scss']
})
export class CopyLinkComponent {
  get link(): string {
    return window.location.href;
  }

  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(): void {
    this.snackbar.open('Link copied', 'Dismiss', {
      duration: 3000
    });
  }
}
