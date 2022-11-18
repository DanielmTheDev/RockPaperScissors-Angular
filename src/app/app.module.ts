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

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    RoomModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule,
    StoreModule.forRoot(reducers, { metaReducers: [rehydrationMetaReducer] }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
    useFactory: initializeRandomNames,
    deps: [RandomNamesProvider],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}

function initializeRandomNames(randomNamesProvider: RandomNamesProvider): () => void {
  return () => randomNamesProvider.initialize();
}
