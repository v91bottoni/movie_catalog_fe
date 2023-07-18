import { Component } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(protected util :UtilityService){

  }

}
