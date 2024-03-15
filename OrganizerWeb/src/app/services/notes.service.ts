import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetNote(ngid: string) : Observable<any>{
        let params = new HttpParams().set("ngid", ngid);

        return this.http.get<any>(this.apiUrl + 'api/Notes/GetNote', { params: params, headers: GetToken(this.cookiesService) })
    }

    GetNotes() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/Notes/GetNotes', { params: params, headers: GetToken(this.cookiesService) })
    }

    AddNote(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Notes/AddNote', model, {headers: GetToken(this.cookiesService)})
    }

    UpdateNote(model: any) : Observable<any>{
        return this.http.put<any>(this.apiUrl + 'api/Notes/UpdateNote', model, {headers: GetToken(this.cookiesService)})
    }
    
    DeleteNote(NGID: any) : Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}api/Notes/DeleteNote/${NGID}`, { headers: GetToken(this.cookiesService)})
    }
}