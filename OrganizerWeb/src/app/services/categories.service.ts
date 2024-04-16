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

    GetCategory(CGID: string) : Observable<any>{
        let params = new HttpParams()
            .set("cgid", CGID);

        return this.http.get<any>(this.apiUrl + 'api/Categories/GetCategory', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetCategories(date: any, Skip: number, Take: number, IsFromTask: boolean) : Observable<any>{
        if(date == undefined)
            date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)

        let newDate = new Date(date);
        let stringDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;

        let params = new HttpParams()
            .set("date", IsFromTask ? '' : stringDate)
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/Categories/GetCategories', { params: params, headers: GetToken(this.cookiesService)});
    }

    GetCategoriesForFilters() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Categories/GetCategoriesForFilter', { params: new HttpParams(), headers: GetToken(this.cookiesService) })
    }

    AddCategory(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Categories/AddCategory', model, { headers: GetToken(this.cookiesService) })
    }

    UpdateCategory(model: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + 'api/Categories/UpdateCategory', model, { headers: GetToken(this.cookiesService) })
    }

    DeleteCategories(cGID: any) : Observable<any>{
        return this.http.delete<any>(this.apiUrl + 'api/Categories/Delete/'+ cGID, { headers: GetToken(this.cookiesService) })
    }
}