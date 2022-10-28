import { FirebasePlayerService } from './firebase-player.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('FirebasePlayerService', () => {
  let service: FirebasePlayerService;
  let fireStore: AngularFirestore;
  let store: Store;

  beforeEach(() => {
    const document = { valueChanges: () => of({}) };
    fireStore = { collection: _ => document } as AngularFirestore;
    store = { select: (_: any) => {} } as Store;
    service = new FirebasePlayerService(fireStore, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
