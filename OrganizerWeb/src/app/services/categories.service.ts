import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getCategories() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Categories')
    }

    saveCategories(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Categories/Save', model)
    }
}