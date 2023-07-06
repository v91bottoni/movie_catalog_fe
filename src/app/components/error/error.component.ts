import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number = 30;
  color: string = "rgba(255,0,0,0.6)";
  message = "Un Errore non Ha permesso il caricamento Dei Contetnuti."+
  "Ci scusiamo e la preghiamo di attendere e riprovare più tardi.";
}
