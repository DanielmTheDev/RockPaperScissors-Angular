import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RandomNamesProvider {
  private names: string[] = [];
  private readonly url = 'https://proxy.cors.sh/https://names.drycodes.com/40?nameOptions=funnyWords&combine=2&separator=space';

  constructor(private httpClient: HttpClient) {}

  initialize(): void {
    this.httpClient.get<string[]>(this.url)
      .subscribe(names => this.names = names);
  }

  provide(...excluding: string[]): Observable<string> {
    return this.names.length
      ? of(this.getRandomNameExcluding(this.names, excluding))
      : this.httpClient.get<string[]>(this.url)
        .pipe(
          tap(names => this.names = names),
          map(names => this.getRandomNameExcluding(names, excluding)));
  }

  private getRandomNameExcluding(names: string[], excluding: string[]): string {
    const allowedNames = names.filter(name => !excluding.includes(name));
    return allowedNames[Math.floor(Math.random() * allowedNames.length)];
  }
}
