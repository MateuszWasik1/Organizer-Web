import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-stats-fill-data-dialog',
  templateUrl: './stats-fill-data-dialog.component.html',
  styleUrls: []
})
export class StatsFillDataDialogComponent {
  constructor(public translations: TranslationService){
  }
}