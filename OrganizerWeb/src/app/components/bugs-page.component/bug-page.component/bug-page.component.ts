import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectBug, selectBugNotes } from '../bugs-page-state/bugs-page-state.selectors';
import { changeBugStatus, loadBug, loadBugNotes, saveBug, saveBugNote } from '../bugs-page-state/bugs-page-state.actions';
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
  public form: FormGroup = new FormGroup({});
  public addBugNote: FormGroup = new FormGroup({});
  public bgid: string = "";
  public isNewBugView: boolean = true;
  public selectedBugStatus: any;
  public bugStatus = [
    {id: '0', name: 'Nie zaczęty'},
    {id: '1', name: 'W trakcie'},
    {id: '2', name: 'Skończony'},
    {id: '3', name: 'Wszystkie'},
  ]

  public Bug$ = this.store.select(selectBug);
  public BugNotes$ = this.store.select(selectBugNotes);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.bgid = this.route.snapshot.paramMap.get('bgid') ?? "";
    this.isNewBugView = this.bgid == "" || this.bgid == "0";

    if(!this.isNewBugView){
      this.store.dispatch(loadBug({ bgid: this.bgid }));
      this.store.dispatch(loadBugNotes({ bgid: this.bgid }));
    }

    this.subscriptions.push(
      this.Bug$.subscribe(x =>{
        this.form = new FormGroup({
          bguid: new FormControl( x.bguid, { validators: [] }),
          bTitle: new FormControl( { value: x.bTitle, disabled: !this.isNewBugView }, { validators: [Validators.maxLength(200)] }),
          bText:  new FormControl( { value: x.bText, disabled: !this.isNewBugView }, { validators: [Validators.maxLength(4000)] }),
          bStatus:  new FormControl( x.bStatus, { validators: [] }),
        })

        this.selectedBugStatus = this.bugStatus[x.bStatus].id
      })
    );

    this.addBugNote = new FormGroup({
      bugNote: new FormControl('', { validators: [Validators.maxLength(4000)] }),
    })
  }

  public SaveBug = () => {
    let model = {
      "BGID": this.form.get("bguid")?.value,
      "BTitle": this.form.get("bTitle")?.value,
      "BText": this.form.get("bText")?.value,
      "BStatus": this.form.get("bStatus")?.value,
    }
    
    this.store.dispatch(saveBug({ bug: model }));
  }

  public AddBugNote = () => {
    let model = {
      "BNBGID": this.form.get("bguid")?.value,
      "BNText": this.addBugNote.get("bugNote")?.value,
    }
    this.store.dispatch(saveBugNote({ BugNote: model }));
  }

  public ChangeBugStatus = (event: any) => {
    let model = {
      "BGID": this.form.get("bguid")?.value,
      "Status": event.value,
    }

    this.store.dispatch(changeBugStatus({ model: model }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
