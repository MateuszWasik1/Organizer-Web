import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-ui-error-handler',
  templateUrl: './ui-error-handler.component.html',
  styleUrls: ['./ui-error-handler.component.scss']
})
export class UIErrorHandler {
  constructor(
    public translations: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
  }
}