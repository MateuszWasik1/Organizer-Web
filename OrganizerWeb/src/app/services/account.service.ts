import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    Login() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Account/Login')
    }
    Register() : Observable<any>{
        let model = {}
        return this.http.post<any>(this.apiUrl + 'api/Account/Login', model)
    }
}