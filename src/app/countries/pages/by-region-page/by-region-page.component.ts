import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public activeRegion?: Region;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.activeRegion = this.countryService.cacheStore.byRegion.region;
  }

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
