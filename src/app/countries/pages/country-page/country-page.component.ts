import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(private activatedrout: ActivatedRoute, private countryService: CountryService, private router: Router) { }

  ngOnInit(): void {
    this.activatedrout.params
      .pipe(
        switchMap(({id}) => this.countryService.searchCountryByAlphCode(id))
      )
      .subscribe(country => {
        if (!country) {
          this.router.navigateByUrl('/countries');
          return;
        }

        this.country = country;
      });
  }

}
