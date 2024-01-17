import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TasksNotesService {
    public apiUrl = 'https://localhost:44393/'
    constructor( private http: HttpClient ) { }

    getTasksNotes(TGID: any) : Observable<any>{
        let params = new HttpParams()
            .set("tGID", TGID);

        return this.http.get<any>(this.apiUrl + 'api/TasksNotes', { params: params })
    }

    addTaskNotes(TNGID: string, TGID: string, taskNote: any) : Observable<any>{
        let model = {
            "TNGID": TNGID,
            "TNTGID": TGID,
            "TNNote": taskNote,
        }

        return this.http.post<any>(this.apiUrl + 'api/TasksNotes/AddTaskNote', model)
    }

    deleteTaskNote(tNGID: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/TasksNotes/DeleteTaskNote/${tNGID}`, tNGID)
    }
}