import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OrganizerWeb';

  public language: string = "pl";

  constructor(public translate: TranslateService){
    translate.addLangs(["pl", "en"]);
    translate.setDefaultLang("pl");
  }

  public ChangeLanguage = (language: string) => {
    this.language = language
    this.translate.setDefaultLang(this.language);
  }
}
