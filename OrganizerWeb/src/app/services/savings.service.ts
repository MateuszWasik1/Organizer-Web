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

    GetSaving(sgid: string) : Observable<any>{
        let params = new HttpParams().set("sgid", sgid);

        return this.http.get<any>(this.apiUrl + 'api/Savings/GetSaving', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetSavings(Skip: number, Take: number) : Observable<any>{
        let params = new HttpParams()
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/Savings/GetSavings', { params: params, headers: GetToken(this.cookiesService) })
    }

    AddSaving(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Savings/AddSaving', model, { headers: GetToken(this.cookiesService) })
    }

    UpdateSaving(model: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + 'api/Savings/UpdateSaving', model, { headers: GetToken(this.cookiesService) })
    }

    DeleteSaving(sGID: any) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'api/Savings/Delete/'+ sGID, { headers: GetToken(this.cookiesService) })
    }
}