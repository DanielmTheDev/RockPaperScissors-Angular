import { CopyLinkComponent } from './copy-link.component';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CopyLinkComponent', () => {
  let component: CopyLinkComponent;
  let snackbar: MatSnackBar;

  beforeEach(() => {
    snackbar = { open: (_1, _2, _3) => {} } as MatSnackBar;
    component = new CopyLinkComponent(snackbar);
  });

  it('shows snackbar', () => {
    spyOn(snackbar, 'open');

    component.showSnackbar();

    expect(snackbar.open).toHaveBeenCalledWith('Link copied', 'Dismiss', { duration: 3000 });
  });
});
