import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { selectBugs } from '../bugs-page-state/bugs-page-state.selectors';
import { loadBug } from '../bugs-page-state/bugs-page-state.actions';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bug-page',
  templateUrl: './bug-page.component.html',
  styleUrls: ['./bug-page.component.scss']
})
export class BugPageComponent implements OnInit, OnDestroy {
  title = 'Błąd - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  public filterForm: FormGroup = new FormGroup({});
  
  public Bug$ = this.store.select(selectBugs);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    let bgid = this.route.snapshot.paramMap.get('ugid');

    if(bgid != "0")
      this.store.dispatch(loadBug({ bgid: bgid }));
    
  }

  public SaveBug = () => {
    // let model = {
    //   "CID": this.form.get("cid")?.value,
    //   "CGID": this.form.get("cgid")?.value,
    //   "CName": this.form.get("cName")?.value,
    //   "CStartDate": this.form.get("cStartDate")?.value,
    //   "CEndDate": this.form.get("cEndDate")?.value,
    //   "CBudget": this.form.get("cBudget")?.value,
    // }
    // this.store.dispatch(saveCategory({ category: model }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
