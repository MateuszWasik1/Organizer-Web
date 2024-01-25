import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OrganizerWeb';

  public language: string = "pl";

  constructor(public translate: TranslateService, public cookieService: CookieService){
    translate.addLangs(["pl", "en"]);

    if(cookieService.get("lang") == ""){
      cookieService.set("lang", "pl");
    }

    translate.setDefaultLang(cookieService.get("lang"));
    this.language = cookieService.get("lang");
  }

  public ChangeLanguage = (language: string) => {
    this.language = language
    this.translate.setDefaultLang(this.language);
    this.cookieService.set("lang", language);
  }
}