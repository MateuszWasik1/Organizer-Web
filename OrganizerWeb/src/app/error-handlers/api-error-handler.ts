import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class APIErrorHandler {
    constructor(){ }

    handleAPIError(error: HttpErrorResponse){
        if(error.status === 401)
            return "Użytkownik nie zautoryzowany!"

        let errorMessage;

        if(error.error instanceof ErrorEvent)
            errorMessage = error.error.error;
        else
            errorMessage = error.error;

        errorMessage = errorMessage.split("System.Exception: ").pop();

        errorMessage = errorMessage.split("\r\n")[0];

        return errorMessage
    }
}