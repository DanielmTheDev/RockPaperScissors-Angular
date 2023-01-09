import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RandomNamesProvider } from '../../../room-creation/services/random-names-provider.service';
import { LoadingStatus } from '../../../shared-lib/spinner/models/loadingStatus';

@Component({
  selector: 'player-creation-modal',
  templateUrl: './player-creation-modal.component.html',
  styleUrls: ['./player-creation-modal.component.scss']
})
export class PlayerCreationModalComponent implements OnInit {
  formGroup = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
  });

  loadingStatus: LoadingStatus = { isLoading: false };

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PlayerCreationModalComponent>,
    private randomNamesProvider: RandomNamesProvider) { }

  ngOnInit(): void {
    this.setRandomName();
  }

  create(): void {
    this.dialogRef.close(this.formGroup.value.name);
  }

  private setRandomName(): void {
    this.loadingStatus.isLoading = true;
    this.randomNamesProvider
      .provide(this.formGroup.controls.name.value)
      .subscribe({
        next: randomName => {
          this.formGroup.controls.name.setValue(randomName);
          this.loadingStatus.isLoading = false;
        },
        error: _error => {
          this.formGroup.controls.name.setValue('');
          this.loadingStatus.isLoading = false;
        }
      });
  }
}
