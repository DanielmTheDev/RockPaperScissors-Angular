import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { RoomModule } from './room/room.module';
import { FirebaseModule } from './firebase/firebase.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './store';
import { rehydrationMetaReducer } from './store/rehydration';
import { RandomNamesProvider } from './room-creation/services/random-names-provider.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    RoomModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule,
    MatIconModule,
    StoreModule.forRoot(reducers, { metaReducers: [rehydrationMetaReducer] }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRandomNames,
      deps: [RandomNamesProvider],
      multi: true
    },
    // These EMULATOR InjectionTokens configure the app to use the local emulator suite when not in production.
    // Remove them if you want to test against the real project FireStore
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 8080],
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 5001],
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}

function initializeRandomNames(randomNamesProvider: RandomNamesProvider): () => void {
  return () => randomNamesProvider.initialize();
}
