import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SavingsService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    getSavings() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Savings', { params: new HttpParams(), headers: GetToken(this.cookiesService) })
    }

    saveSaving(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Savings/Save', model, { headers: GetToken(this.cookiesService) })
    }

    deleteSaving(sGID: any) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'api/Savings/Delete/'+ sGID, { headers: GetToken(this.cookiesService) })
    }
}