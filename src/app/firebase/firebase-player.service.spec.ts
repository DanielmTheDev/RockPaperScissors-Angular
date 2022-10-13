import { TestBed } from '@angular/core/testing';
import { FirebasePlayerService } from './firebase-player.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { RoomComponent } from '../room/room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FirebasePlayerService', () => {
  let service: FirebasePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomComponent],
      providers: [
        FirebasePlayerService,
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
    service = TestBed.inject(FirebasePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
