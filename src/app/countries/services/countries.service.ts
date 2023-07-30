import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private url = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCapital(capital: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.url}/capital/${capital}`);
  }

}
