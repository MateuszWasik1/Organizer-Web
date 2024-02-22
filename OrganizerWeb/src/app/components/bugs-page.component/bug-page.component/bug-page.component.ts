import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectBug } from '../bugs-page-state/bugs-page-state.selectors';
import { loadBug, saveBug } from '../bugs-page-state/bugs-page-state.actions';
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
  
  public Bug$ = this.store.select(selectBug);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    let bgid = this.route.snapshot.paramMap.get('bgid');

    if(bgid != "0")
      this.store.dispatch(loadBug({ bgid: bgid }));

    this.subscriptions.push(
      this.Bug$.subscribe(x =>{
        console.log(x)
        this.form = new FormGroup({
          bTitle: new FormControl( x.bTitle, { validators: [Validators.maxLength(200)] }),
          bText:  new FormControl( x.bText, { validators: [Validators.maxLength(4000)] }),
          bStatus:  new FormControl( x.bStatus, { validators: [] }),
        })
      })
    )
  }

  public SaveBug = () => {
    let model = {
      "BTitle": this.form.get("bTitle")?.value,
      "BText": this.form.get("bText")?.value,
      "BStatus": this.form.get("bStatus")?.value,
    }
    
    this.store.dispatch(saveBug({ bug: model }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
