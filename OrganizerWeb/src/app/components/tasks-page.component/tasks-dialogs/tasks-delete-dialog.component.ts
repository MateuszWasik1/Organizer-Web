import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-tasks-delete-dialog',
  templateUrl: './tasks-delete-dialog.component.html',
  styleUrls: ['../tasks-page.component.scss']
})
export class TasksDeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translations: TranslationService)
  {

  }
}