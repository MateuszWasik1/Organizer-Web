import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    Register(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Accounts/Register', model)
    }

    Login(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Accounts/Login', model)
    }
}