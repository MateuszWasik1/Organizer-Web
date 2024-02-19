import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RolesService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetUserRoles() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/Roles/GetUserRoles', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetIsUserAdmin() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/Roles/GetIsUserAdmin', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetIsUserSupport() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/Roles/GetIsUserSupport', { params: params, headers: GetToken(this.cookiesService) })
    }
}