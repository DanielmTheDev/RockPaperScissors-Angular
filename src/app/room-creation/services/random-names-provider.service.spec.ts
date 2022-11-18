import { RandomNamesProvider } from './random-names-provider.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('RandomNamesProvider', () => {
  let service: RandomNamesProvider;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = { get: (_: string) => of([]) } as HttpClient;
    service = new RandomNamesProvider(httpClient);
  });

  it('provides a random name', () => {
    const allNames = ['Imene', 'Daniel'];
    spyOn(httpClient, 'get').and.returnValue(of(allNames));

    service.provide().subscribe(name => expect(allNames).toContain(name));
  });

  it('excludes passed names from the list', () => {
    spyOn(Math, 'random').and.returnValue(0);
    const allNames = ['Imene', 'Daniel'];
    spyOn(httpClient, 'get').and.returnValue(of(allNames));

    service.provide('Imene').subscribe(name => expect(name).toBe('Daniel'));
  });

  it('initializes the names and does not make another call when providing them afterwards', () => {
    spyOn(httpClient, 'get').and.returnValue(of(['Pollin']));

    service.initialize();

    service.provide().subscribe(name => {
      expect(name).toBe('Pollin');
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
  });
});
