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
        let start = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
        let end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
        let params = new HttpParams()
            .set("startDate", start)
            .set("endDate", end);
            
        return this.http.get<any>(this.apiUrl + 'api/Stats/GetSavingBarChart', { params: params })
    }
}