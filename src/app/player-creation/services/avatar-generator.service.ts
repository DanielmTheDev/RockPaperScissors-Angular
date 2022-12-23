import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AvatarGenerator {
  private readonly url = 'https://proxy.cors.sh/https://api.multiavatar.com/';

  constructor(private httpClient: HttpClient) {}

  provide(playerName: string): Observable<string> {
    const HTTPOptions = {
      'headers': new HttpHeaders({
        'Accept': 'text/html'
      }),
      'responseType': 'text' as 'json'
    };
    return this.httpClient.get<string>(this.url + playerName, HTTPOptions);
  }
}
