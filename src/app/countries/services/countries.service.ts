import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {

  private url = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(err => {
        console.log('Error en el servicio', err.message);
        return of([])
      }),
      delay(1000)
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
    return this.getCountriesRequest(`${this.url}/capital/${capital}`)
    .pipe(
      tap(countries => this.cacheStore.byCapital = { term: capital, countries }),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/name/${country}`)
    .pipe(
      tap(countries => this.cacheStore.byCountries = { term: country, countries }),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/region/${region}`)
    .pipe(
      tap(countries => this.cacheStore.byRegion = { region, countries }),
      tap(() => this.saveToLocalStorage())
    );
  }

}
