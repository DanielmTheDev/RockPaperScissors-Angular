import { HomeComponent } from './home.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RoomCreationModalComponent } from '../room-creation/room-creation-modal/room-creation-modal.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    const dialog = { open: (_1, _2) => {} } as MatDialog;
    dialogSpy = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component = new HomeComponent(dialog);
  });

  it('opens the dialog with configuration', () => {
    component.openDialog();

    expect(dialogSpy).toHaveBeenCalledWith(RoomCreationModalComponent, { width: '20rem' });
  });
});
