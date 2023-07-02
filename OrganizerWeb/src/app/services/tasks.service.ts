import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getTasks() : Observable<any>{
        return this.http.get<any>(this.apiUrl + 'api/Tasks')
    }

    saveTask(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Tasks/Save', model)
    }
}