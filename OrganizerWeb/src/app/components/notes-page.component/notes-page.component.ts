import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { cleanState, deleteNote, loadNotes, updatePaginationData } from './notes-page-state/notes-page-state.actions';
import { selectCount, selectErrorMessage, selectFilters, selectNotes } from './notes-page-state/notes-page-state.selectors';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit, OnDestroy {
  title = 'Notatki - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public count: number = 0;

  public Notes$ = this.store.select(selectNotes);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadNotes())));

    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public AddNote = () => this.router.navigate(['notes/0']);

  public ModifyNote = (ngid: any) => this.router.navigate([`notes/${ngid}`]);

  public DeleteNote = (ngid: any) => this.store.dispatch(deleteNote({ NGID: ngid }));

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationData({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}