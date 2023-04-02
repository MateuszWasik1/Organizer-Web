import { Component } from '@angular/core';
import { testService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OrganizerWeb';
  public testData: any;

  constructor(private testService: testService){
    testService.getTestData().subscribe(x => this.testData = x)
  }
}
