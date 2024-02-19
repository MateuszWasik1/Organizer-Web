import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    getCategories(date: any, isFromTask: boolean) : Observable<any>{
        if(date == undefined)
            date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)

        let newDate = new Date(date);
        let stringDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;

        let params = new HttpParams().set("date", isFromTask ? '' : stringDate);

        return this.http.get<any>(this.apiUrl + 'api/Categories/Get', { params: params, headers: GetToken(this.cookiesService)});
    }

    getCategoriesForFilters() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Categories/GetCategoriesForFilter', { params: new HttpParams(), headers: GetToken(this.cookiesService) })
    }

    saveCategories(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Categories/Save', model, { headers: GetToken(this.cookiesService) })
    }

    deleteCategories(cGID: any) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'api/Categories/Delete/'+ cGID, { headers: GetToken(this.cookiesService) })
    }
}