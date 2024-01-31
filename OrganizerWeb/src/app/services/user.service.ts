import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetUser() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/User', { params: params, headers: GetToken(this.cookiesService) })
    }

    SaveUser(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/User/Save', model, { headers: GetToken(this.cookiesService) })
    }
}