import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'player-creation-modal',
  templateUrl: './player-creation-modal.component.html',
  styleUrls: ['./player-creation-modal.component.scss']
})
export class PlayerCreationModalComponent {
  formGroup = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PlayerCreationModalComponent>) { }

  create(): void {
    this.dialogRef.close(this.formGroup.value.name);
  }
}
