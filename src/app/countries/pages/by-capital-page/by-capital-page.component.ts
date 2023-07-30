import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  constructor(private countryService: CountryService) { }

  searchByCapital(termino: string): void {
    this.countryService.searchCapital(termino).subscribe(
      countries => console.log(countries)
    );
  }
}
