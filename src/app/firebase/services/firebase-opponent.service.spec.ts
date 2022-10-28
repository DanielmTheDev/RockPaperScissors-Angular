import { FirebaseOpponentService } from './firebase-opponent.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('FirebaseOpponentService', () => {
  let service: FirebaseOpponentService;
  let firestore: AngularFirestore;
  let store: Store;

  beforeEach(() => {
    store = { select: (_: any) => of({}) } as Store;
    firestore = {} as AngularFirestore;
    service = new FirebaseOpponentService(firestore, store)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
