import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TransaltionService {
    public translations;

    constructor() { 
        this.translations = (<any> window)
        console.log((<any> window));
    }

    public GetValue(value: string){
        let tranlsation = this.translations[value];
        if(tranlsation)
            return tranlsation
        else
            return "";
    }
}