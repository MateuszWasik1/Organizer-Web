import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectErrorMessage, selectNote } from '../notes-page-state/notes-page-state.selectors';
import { addNote, cleanState, loadNote, updateNote } from '../notes-page-state/notes-page-state.actions';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit, OnDestroy {
  title = 'Notatka - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({});
  public ngid: string = "";
  public isNewNoteView: boolean = true;

  public Note$ = this.store.select(selectNote);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.ngid = this.route.snapshot.paramMap.get('ngid') ?? "";
    this.isNewNoteView = this.ngid == "" || this.ngid == "0";

    if(!this.isNewNoteView){
      this.store.dispatch(loadNote({ NGID: this.ngid }));
    }
    
    this.subscriptions.push(
      this.Note$.subscribe(x =>{
        this.form = new FormGroup({
          NGID: new FormControl( x.NGID, { validators: [] }),
          NDate:new FormControl( x.NDate, { validators: [] }),
          NModificationDate:new FormControl( x.NModificationDate, { validators: [] }),
          NTitle: new FormControl( x.NTitle, { validators: [Validators.maxLength(200)] }),
          NTxt: new FormControl( x.NTxt, { validators: [Validators.maxLength(4000)] }),
        })
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    )
  }

  public SaveNote = () => {
    let model = {
      "NGID": this.form.get("NGID")?.value,
      "NTitle": this.form.get("NTitle")?.value,
      "NTxt": this.form.get("NTxt")?.value,
    }
    
    if(model.NGID == "0" || model.NGID == "")
      this.store.dispatch(addNote({ Note: model }));
    else
      this.store.dispatch(updateNote({ Note: model }));
  }

  public Cancel = () => this.router.navigate(['/notes']);

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}
