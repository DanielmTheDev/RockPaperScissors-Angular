import { PlayerCreationModalComponent } from './player-creation-modal.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

describe('PlayerCreationModalComponent', () => {
  let component: PlayerCreationModalComponent;

  let formBuilder: FormBuilder;
  let dialogRef: MatDialogRef<PlayerCreationModalComponent>;

  beforeEach(() => {
    formBuilder = { group: (_: any) => {} } as FormBuilder;

    component = new PlayerCreationModalComponent(formBuilder, dialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
