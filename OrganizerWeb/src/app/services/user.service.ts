import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) {}

    GetAllUsers() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/User/GetAllUsers', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetUserByAdmin(ugid: any) : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/User/GetUserByAdmin/' + ugid, { params: params, headers: GetToken(this.cookiesService) })
    }

    GetUser() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/User/GetUser', { params: params, headers: GetToken(this.cookiesService) })
    }

    SaveUser(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/User/SaveUser', model, { headers: GetToken(this.cookiesService) })
    }

    SaveUserByAdmin(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/User/SaveUserByAdmin', model, { headers: GetToken(this.cookiesService) })
    }

    DeleteUser(ugid: any) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'api/User/DeleteUser/' + ugid, { headers: GetToken(this.cookiesService) })
    }
}