import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getTasks(CGID: any, Status: number) : Observable<any>{
        let params = new HttpParams()
            .set("cGID", CGID)
            .set("status", Status);

        return this.http.get<any>(this.apiUrl + 'api/Tasks', { params: params })
    }

    saveTask(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Tasks/Save', model)
    }

    deleteTask(tgid: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Tasks/Delete/${tgid}`, tgid)
    }
}