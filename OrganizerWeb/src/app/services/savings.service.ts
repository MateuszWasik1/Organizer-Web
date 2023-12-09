import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SavingsService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getSavings() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Savings', { params: new HttpParams() })
    }

    saveSaving(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Savings/Save', model)
    }

    deleteSaving(sGID: any) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'api/Savings/Delete/'+ sGID, sGID)
    }
}