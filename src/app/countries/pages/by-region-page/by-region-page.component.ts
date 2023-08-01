import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public activeRegion?: Region;

  constructor(private countryService: CountryService) { }

  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.activeRegion = region;
    this.countryService.searchRegion(region).subscribe(
      countries => {
        this.countries = countries;
        this.isLoading = false;
      }
    );
  }

}
