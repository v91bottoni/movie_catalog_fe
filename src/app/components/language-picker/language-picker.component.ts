import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit{

  readonly languages = [
    { value: 'en', label: 'English', img: 'assets/icons/gb.svg' },
    { value: 'it', label: 'Italiano', img: 'assets/icons/it.svg'}
  ];

  selectedLanguage = this.languages[0];

  ngOnInit(): void {
    if(localStorage.getItem('lang')){
      let lang = localStorage.getItem('lang');
      this.selectedLanguage = this.languages.find( language => language.value === lang) || this.languages[0];
      this.changeLang(this.selectedLanguage.value);
    }
  }

  constructor(
    public translate: TranslateService
  ){ }

  changeLang(lang: string){
    console.log(lang);

    this.selectedLanguage = this.languages.find( language => language.value === lang) || this.languages[0];
    localStorage.setItem('lang', this.selectedLanguage.value);
    this.translate.use(lang);
  }
}
