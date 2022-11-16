import { PlayerCreationModalComponent } from './player-creation-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

describe('PlayerCreationModalComponent', () => {
  let component: PlayerCreationModalComponent;
  let formBuilder: FormBuilder;
  let dialogRef: MatDialogRef<PlayerCreationModalComponent>;

  beforeEach(() => {
    formBuilder = {
      nonNullable: {
        group: (_: any) => {}
      },
    } as FormBuilder;
    dialogRef = { close: _ => {} } as MatDialogRef<PlayerCreationModalComponent>;
    component = new PlayerCreationModalComponent(formBuilder, dialogRef);
  });

  it('sends the name when closing the modal', () => {
    component.formGroup = { value: { name: 'Imene' } } as FormGroup;
    spyOn(dialogRef, 'close');

    component.create();

    expect(dialogRef.close).toHaveBeenCalledWith('Imene');
  });
});
