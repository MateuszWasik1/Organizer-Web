import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getCategories(date: any) : Observable<any>{
        if(date == undefined)
            date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)

        let newDate = new Date(date);
        let stringDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
        let params = new HttpParams().set("date", stringDate);

        return this.http.get<any>(this.apiUrl + 'api/Categories', { params: params })
    }

    saveCategories(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Categories/Save', model)
    }

    deleteCategories(cGID: any) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'api/Categories/Delete/'+ cGID, cGID)
    }
}