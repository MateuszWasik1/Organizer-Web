import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TasksSubTasksService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetTasksSubTask(TGID: any) : Observable<any>{
        let params = new HttpParams()
            .set("tGID", TGID);

        return this.http.get<any>(this.apiUrl + 'api/TasksNotes', { params: params, headers: GetToken(this.cookiesService) })
    }

    AddTaskSubTask(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/TasksNotes/AddTaskNote', model, {headers: GetToken(this.cookiesService)})
    }

    ChangeTaskSubTaskStatus(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/TasksNotes/AddTaskNote', model, {headers: GetToken(this.cookiesService)})
    }

    DeleteTaskSubTask(tNGID: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/TasksNotes/DeleteTaskNote/${tNGID}`, { headers: GetToken(this.cookiesService)})
    }
}