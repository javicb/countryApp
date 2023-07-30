import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  searchByCapital(termino: string): void {
    this.countryService.searchCapital(termino).subscribe(
      countries => this.countries = countries
    );
  }
}
