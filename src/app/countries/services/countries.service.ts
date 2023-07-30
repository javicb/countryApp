import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private url = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCapital(capital: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.url}/capital/${capital}`)
    .pipe(
      catchError(err => {
        console.log('Error en el servicio', err.message);
        return of([])
      })
    );
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.url}/name/${country}`)
    .pipe(
      catchError(err => {
        console.log('Error en el servicio', err.message);
        return of([])
      })
    );
  }

}
