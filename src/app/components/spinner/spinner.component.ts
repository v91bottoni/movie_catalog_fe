import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  spinnerActive: boolean = true;

  constructor(
    public spinnerHandler: SpinnerService) {
    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  showSpinner = (state: boolean): void => {
    this.spinnerActive = state;
  };

}