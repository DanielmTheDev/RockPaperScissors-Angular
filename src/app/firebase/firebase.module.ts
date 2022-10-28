import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { FirebasePlayerService } from './services/firebase-player.service';
import { FirebaseRoomService } from './services/firebase-room.service';
import { FirebaseOpponentService } from './services/firebase-opponent.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions())
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    FirebasePlayerService,
    FirebaseRoomService,
    FirebaseOpponentService
  ],
  exports: []
})
export class FirebaseModule {}
