import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import firebaseConstants from '../../firebase/constants/firebase-constants';

@Injectable()
export class AvatarGenerator {
  constructor(private httpClient: HttpClient, private functions: AngularFireFunctions) {}

  provide(playerName: string): Observable<string> {
    return this.functions.httpsCallable(firebaseConstants.callableFunctions.getAvatar)({ playerName });
  }
}
