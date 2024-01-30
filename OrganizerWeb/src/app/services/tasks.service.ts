import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    getTasks(CGID: any, Status: number) : Observable<any>{
        let params = new HttpParams()
            .set("cGID", CGID)
            .set("status", Status);

        return this.http.get<any>(this.apiUrl + 'api/Tasks', { params: params, headers: GetToken(this.cookiesService) })
    }

    saveTask(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Tasks/Save', model, { headers: GetToken(this.cookiesService) })
    }

    deleteTask(tgid: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Tasks/Delete/${tgid}`, { headers: GetToken(this.cookiesService) })
    }
}