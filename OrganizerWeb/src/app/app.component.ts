import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  public stopNavigate: boolean = false;
  public hideMenu: boolean = false

  constructor(public translate: TranslateService, 
    public cookieService: CookieService, 
    public router: Router)
  {
    //routing - find if in component login or register
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.hideMenu = e.url.includes("register") || e.url.includes("login");
        this.stopNavigate = e.url.includes("register"); 
      }
    });

    //Token
    if(cookieService.get("token") == "" && !this.stopNavigate)
      this.router.navigate(["/login"]);

    //Language
    translate.addLangs(["pl", "en"]);

    if(cookieService.get("lang") == "")
      cookieService.set("lang", "pl");

    translate.setDefaultLang(cookieService.get("lang"));
    this.language = cookieService.get("lang");
  }

  public GoToUser = () => this.router.navigate(['/user']);

  public ChangeLanguage = (language: string) => {
    this.language = language
    this.translate.setDefaultLang(this.language);
    this.cookieService.set("lang", language);
  }

  public LogOut = () => {
    this.cookieService.set("token", "");
    this.router.navigate(['login'])
  }
}