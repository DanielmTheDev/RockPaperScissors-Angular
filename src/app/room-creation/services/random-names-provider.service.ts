import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({ providedIn: 'root' })
export class RandomNamesProvider {
  private names: string[] = [];

  constructor(private httpClient: HttpClient, private functions: AngularFireFunctions) {}

  initialize(): void {
    this.functions.httpsCallable('getRandomNames')({})
      .subscribe(names => this.names = names);
  }

  provide(...excluding: string[]): Observable<string> {
    return this.names.length
      ? of(this.getRandomNameExcluding(this.names, excluding))
      : this.functions.httpsCallable('getRandomNames')({})
        .pipe(
          tap(names => this.names = names),
          map(names => this.getRandomNameExcluding(names, excluding)));
  }

  private getRandomNameExcluding(names: string[], excluding: string[]): string {
    const allowedNames = names.filter(name => !excluding.includes(name));
    return allowedNames[Math.floor(Math.random() * allowedNames.length)];
  }
}
