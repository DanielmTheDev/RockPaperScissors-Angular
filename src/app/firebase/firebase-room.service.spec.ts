import { TestBed } from '@angular/core/testing';
import { FirebaseRoomService } from "./firebase-room.service";
import { of } from "rxjs";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RoomCreationModalComponent } from '../home/room-creation-modal/room-creation-modal.component';

describe('ServicesService', () => {
  let service: FirebaseRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomCreationModalComponent ],
      providers: [
        FirebaseRoomService,
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
      imports: [BrowserAnimationsModule]
    });
    service = TestBed.inject(FirebaseRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
