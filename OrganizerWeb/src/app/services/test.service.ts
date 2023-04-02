import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class testService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getTestData() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Test')
    }
}