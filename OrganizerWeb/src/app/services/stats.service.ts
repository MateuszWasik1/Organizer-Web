import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    getSavingsBarChart(startDate: Date, endDate: Date) : Observable<any>{
        let params = new HttpParams()
            .set("startDate", this.DateToString(new Date(startDate)))
            .set("endDate", this.DateToString(new Date(endDate)));
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetSavingBarChart', { params: params, headers: GetToken(this.cookiesService) })
    }

    getMoneySpendedFromTaskBarChart(startDate: Date, endDate: Date) : Observable<any>{
        let params = new HttpParams()
            .set("startDate", this.DateToString(new Date(startDate)))
            .set("endDate", this.DateToString(new Date(endDate)));
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetMoneySpendedFromTaskBarChart', { params: params, headers: GetToken(this.cookiesService) })
    }

    getMoneySpendedForCategoryBarChart(startDate: Date, endDate: Date, cGID: string) : Observable<any>{
        let params = new HttpParams()
            .set("startDate", this.DateToString(new Date(startDate)))
            .set("endDate", this.DateToString(new Date(endDate)))
            .set("cGID", cGID);
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetMoneySpendedForCategoryBarChart', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetNotesBarChart(startDate: Date, endDate: Date) : Observable<any>{
        let params = new HttpParams()
            .set("startDate", this.DateToString(new Date(startDate)))
            .set("endDate", this.DateToString(new Date(endDate)));
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetNotesBarChart', { params: params, headers: GetToken(this.cookiesService) })
    }

    public DateToString = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}