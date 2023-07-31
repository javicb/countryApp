import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountryService {

  private url = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(err => {
        console.log('Error en el servicio', err.message);
        return of([])
      })
    );
  }

  searchCountryByAlphCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.url}/alpha/${code}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(err => {
        console.log('Error en el servicio', err.message);
        return of(null)
      })
    );
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/capital/${capital}`);
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/name/${country}`);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/region/${region}`);
  }

}
