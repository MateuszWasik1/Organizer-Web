import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetTask(TGID: any) : Observable<any>{
        let params = new HttpParams().set("tgid", TGID);

        return this.http.get<any>(this.apiUrl + 'api/Tasks/GetTask', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetTasks(CGID: any, Status: number, Skip: number, Take: number) : Observable<any>{
        let params = new HttpParams()
            .set("cGID", CGID)
            .set("status", Status)
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/Tasks/GetTasks', { params: params, headers: GetToken(this.cookiesService) })
    }

    AddTask(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Tasks/AddTask', model, { headers: GetToken(this.cookiesService) })
    }

    UpdateTask(model: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + 'api/Tasks/UpdateTask', model, { headers: GetToken(this.cookiesService) })
    }

    DeleteTask(tgid: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Tasks/Delete/${tgid}`, { headers: GetToken(this.cookiesService) })
    }

    DeleteTaskRelatedEntities(model: any) : Observable<any>{
        return this.http.post<any>(`${this.apiUrl}api/Tasks/DeleteWithRelatedEntities`, model, { headers: GetToken(this.cookiesService) })
    }
}