import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomComponent } from './room.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { FirebasePlayerService } from '../firebase/firebase-player.service';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  const fakeActivatedRoute = {
    snapshot: { params: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomComponent],
      providers: [FormBuilder, MatDialog, FirebasePlayerService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        {
          provide: AngularFirestore, useValue: {
            collection: (_: any) => ({
              add: (_: any) => Promise.resolve({}),
              valueChanges: () => of([])
            }),
          }
        }
      ],
      imports: [MatDialogModule, RouterTestingModule, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
