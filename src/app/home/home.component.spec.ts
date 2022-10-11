import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { RoomCreationModalComponent } from "./room-creation-modal/room-creation-modal.component";
import { of } from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' }
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ MatDialogModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('opens the dialog with configuration', () => {
    component.openDialog();

    expect(dialogSpy).toHaveBeenCalledWith(RoomCreationModalComponent, { width: "20rem" });
  });
});
