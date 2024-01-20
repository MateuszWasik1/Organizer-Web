import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-categories-fill-data-dialog',
  templateUrl: './categories-fill-data-dialog.component.html',
  styleUrls: []
})
export class CategoriesFillDataDialogComponent {
  constructor(public translations: TranslationService){
  }
}