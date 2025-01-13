import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'hu']); // Elérhető nyelvek
    this.translate.setDefaultLang('hu'); // Alapértelmezett nyelv
    // this.translate.use('en'); // Használt nyelv


  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
