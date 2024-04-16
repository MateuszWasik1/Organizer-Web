import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent{
    title = 'Oszczędności - P1 - Mateusz Wąsik';

    @Input() length: number = 50;
    @Output() paginationData = new EventEmitter<object>();

    public pageSizeOptions: number[] = [1, 3, 5, 10, 15, 20, 25, 50, 100];
    public pageSize: number = 10;
    public pageIndex: number = 0;

    constructor(public translations: TranslationService)
    {
    }

    HandlePageEvent(e: PageEvent) {
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;

      this.paginationData.emit({ 
        Skip: this.pageIndex * this.pageSize, 
        Take: this.pageSize 
      });
    }
}