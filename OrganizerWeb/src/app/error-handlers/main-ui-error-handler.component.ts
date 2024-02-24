import { Injectable } from '@angular/core';
import { UIErrorHandler } from './ui-error-handler/ui-error-handler.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class MainUIErrorHandler {
    constructor(private dialog: MatDialog)
    {
    }

    HandleException(error: any){
        if(error){
            this.dialog.open(UIErrorHandler, {
                minWidth: "658px",
                minHeight: "140px",
                data: {
                    error: error
                },
                panelClass: 'ui-error-handler-modal'
            })
        }
    }
}