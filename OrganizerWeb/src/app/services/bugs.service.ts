import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";
import { BugTypeEnum } from "../enums/BugTypeEnum";

@Injectable({
    providedIn: 'root'
})
export class BugsService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetBugs(BugType: BugTypeEnum, Skip: number, Take: number) : Observable<any>{
        let params = new HttpParams()
            .set("bugType", BugType)
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/Bugs/GetBugs', { params: params, headers: GetToken(this.cookiesService)});
    }

    GetBug(bgid: any) : Observable<any>{
        let params = new HttpParams().set("bgid", bgid);

        return this.http.get<any>(this.apiUrl + 'api/Bugs/GetBug', { params: params, headers: GetToken(this.cookiesService)});
    }

    GetBugNotes(bgid: any, Skip: number, Take: number) : Observable<any>{
        let params = new HttpParams()
            .set("bgid", bgid)
            .set("skip", Skip)
            .set("take", Take);

        return this.http.get<any>(this.apiUrl + 'api/BugsNotes/GetBugNotes', { params: params, headers: GetToken(this.cookiesService)});
    }
    
    SaveBug(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Bugs/SaveBug', model, { headers: GetToken(this.cookiesService) })
    }

    SaveBugNote(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/BugsNotes/SaveBugNote', model, { headers: GetToken(this.cookiesService) })
    }

    ChangeBugStatus(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Bugs/ChangeBugStatus', model, { headers: GetToken(this.cookiesService) })
    }
}