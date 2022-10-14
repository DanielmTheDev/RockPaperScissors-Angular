import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { FirebaseRoomService } from "./firebase-room.service";
import { FirebasePlayerService } from './firebase-player.service';
import { environment } from 'src/environments/environment';

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
    FirebaseRoomService
  ],
  exports: []
})
export class FirebaseModule { }
