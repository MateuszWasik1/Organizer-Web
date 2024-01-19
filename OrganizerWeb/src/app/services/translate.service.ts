import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    constructor(public translate: TranslateService) { }

    public Get = (translation: string) => this.translate.instant(translation);
}