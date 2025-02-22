import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { deleteUser } from '../../users-page.component/users-page-state/users-page-state.actions';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteUserDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  
  public form: FormGroup = new FormGroup({
    deleteOption: new FormControl(false),
  });

  constructor(public translations: TranslationService,
    public store: Store<AppState>
  ){
  }

  public DeleteUser = () => {
    this.store.dispatch(deleteUser({ ugid: this.data.ugid }))
    this.dialogRef.close();
  }
}