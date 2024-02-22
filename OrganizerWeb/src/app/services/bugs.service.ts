import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { GetToken } from "../helpers/request.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BugsService {
    public apiUrl = environment.apiUrl;
    constructor( private http: HttpClient, private cookiesService: CookieService ) { }

    GetBugs() : Observable<any>{
        let params = new HttpParams();

        return this.http.get<any>(this.apiUrl + 'api/Bugs/GetBugs', { params: params, headers: GetToken(this.cookiesService)});
    }

    GetBug(bgid: any) : Observable<any>{
        let params = new HttpParams()
            .set("bgid", bgid);

        return this.http.get<any>(this.apiUrl + 'api/Bugs/GetBug', { params: params, headers: GetToken(this.cookiesService)});
    }
    
    SaveBug(model: any) : Observable<any>{
        return this.http.post<any>(this.apiUrl + 'api/Bugs/GetBug', model, { headers: GetToken(this.cookiesService) })
    }
}