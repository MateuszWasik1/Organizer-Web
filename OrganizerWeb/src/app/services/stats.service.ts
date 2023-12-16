import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getSavingsBarChart(startDate: Date, endDate: Date) : Observable<any>{
        let params = new HttpParams()
            .set("startDate", this.DateToString(startDate))
            .set("endDate", this.DateToString(endDate));
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetSavingBarChart', { params: params })
    }

    getMoneySpendedFromTaskBarChart(startDate: Date, endDate: Date) : Observable<any>{
        let params = new HttpParams()
            .set("startDate", this.DateToString(startDate))
            .set("endDate", this.DateToString(endDate));
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetMoneySpendedFromTaskBarChart', { params: params })
    }

    getMoneySpendedForCategoryBarChart(startDate: Date, endDate: Date, cGID: string) : Observable<any>{
        let params = new HttpParams()
            .set("startDate", this.DateToString(startDate))
            .set("endDate", this.DateToString(endDate))
            .set("cGID", cGID);
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetMoneySpendedForCategoryBarChart', { params: params })
    }

    public DateToString = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}