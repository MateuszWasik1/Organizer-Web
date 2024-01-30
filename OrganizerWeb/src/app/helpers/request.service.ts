import { CookieService } from "ngx-cookie-service";

export function GetToken(cookieService: CookieService){
    let token = cookieService.get("token");

    return {'Authorization': `Bearer ${token}`}
}