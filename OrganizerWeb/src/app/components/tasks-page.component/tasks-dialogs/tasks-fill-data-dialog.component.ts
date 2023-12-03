import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-fill-data-dialog',
  templateUrl: './tasks-fill-data-dialog.component.html',
  styleUrls: []
})
export class TasksFillDataDialogComponent implements OnInit {
  public IsTasksError: boolean = false;
  public IsCategoriesError: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

  }
  ngOnInit(): void {
    this.IsTasksError = this.data.IsTasksError
    this.IsCategoriesError = this.data.IsCategoriesError
  }
}