import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public language: string = "pl";
  public stopNavigate: boolean = false;
  public hideMenu: boolean = false
  public mainClass: string = "container";
  public IsAdmin: boolean = false;
  public IsSupport: boolean = false;
  public IsMobileMenuActive : boolean = false;

  constructor(public translate: TranslateService, 
    public cookieService: CookieService, 
    public rolesService: RolesService, 
    public router: Router,
    public route: ActivatedRoute)
  {
    //routing - find if in component login or register
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.hideMenu = e.url.includes("register") || e.url.includes("login");
        this.stopNavigate = e.url.includes("register"); 
        this.mainClass = e.url.includes("register") || e.url.includes("login") ? "account-container" : "container";
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

    //GetUserRoles
    if(!this.hideMenu){
      this.rolesService.GetUserRoles().subscribe(x => {
        this.IsAdmin = x.isAdmin;
        this.IsSupport = x.isSupport;
      });
    }
  }

  public ToggleMobileMenu = () => this.IsMobileMenuActive = !this.IsMobileMenuActive;

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