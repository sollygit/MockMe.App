import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConfigurationService } from '../../services/configuration.service';
import { DataService } from '../../services/data.service';
import { Country } from 'src/app/types/country.type';
import { Offer } from 'src/app/types/offer.type';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  myForm = new FormGroup({
    countryControl: new FormControl('', [Validators.required]),
    stateControl: new FormControl('', [Validators.required]),
    postcodeControl: new FormControl('', [Validators.required]),
    fullNameControl: new FormControl('', [Validators.required])
  });
  matcher = new MyErrorStateMatcher();
  offer: any;
  countries!: Country[];
  states = this.config.states;
  isAU = true;

  constructor(
    private config: ConfigurationService,
    private dataService: DataService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.dataService.getCountries()
      .subscribe((response: Country[]) => {
        this.countries = response;
      });
  }

  onCountrySelected(event: Event) {
    this.isAU = ((event.target as HTMLSelectElement).value === 'AU');
    if (this.isAU) {
      this.isAU = true;
      this.myForm.controls['stateControl'].enable();
      this.myForm.controls['postcodeControl'].enable();
      this.myForm.controls['stateControl'].reset();
      this.myForm.controls['postcodeControl'].reset();
    }
    else {
      this.isAU = false;
      this.myForm.controls['stateControl'].setValue(null);
      this.myForm.controls['postcodeControl'].setValue(null);
      this.myForm.controls['stateControl'].disable();
      this.myForm.controls['postcodeControl'].disable();
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.offer = new Offer({
        country: this.myForm.controls['countryControl'].value,
        state: this.myForm.controls['stateControl'].value,
        postcode: this.myForm.controls['postcodeControl'].value,
        fullName: this.myForm.controls['fullNameControl'].value
      });
      localStorage.setItem('offer', JSON.stringify(this.offer, null, 2));
      this.snackBar.open('Great Job', 'Success');
    }
  }

  onReset() {
    this.offer = null;
    localStorage.removeItem('offer');
    setTimeout(() => this.myForm.controls['stateControl'].reset(), 100);
  }

}
