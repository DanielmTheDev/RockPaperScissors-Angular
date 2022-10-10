import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomCreationModalComponent } from './room-creation-modal.component';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('RoomCreationModalComponent', () => {
  let component: RoomCreationModalComponent;
  let dialogSpy: jasmine.Spy;
  let fixture: ComponentFixture<RoomCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCreationModalComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule
      ],
      providers: [ {
        provide: MatDialogRef,
        useValue:  { close: () => { } }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogSpy = spyOn(TestBed.get(MatDialogRef<RoomCreationModalComponent>), 'close');
  });

  it('closes the dialog on cancellation', () => {
    component.cancel()

    expect(dialogSpy).toHaveBeenCalled();
  });
});
