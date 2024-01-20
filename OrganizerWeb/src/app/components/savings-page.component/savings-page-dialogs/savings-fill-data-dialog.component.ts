import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-savings-fill-data-dialog',
  templateUrl: './savings-fill-data-dialog.component.html',
  styleUrls: []
})
export class SavingsFillDataDialogComponent {
  constructor(public translations: TranslationService){
  }
}