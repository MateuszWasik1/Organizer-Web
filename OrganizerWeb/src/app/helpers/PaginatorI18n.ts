import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorI18n extends MatPaginatorIntl {
    public translate!: TranslateService;

    GetPaginatorIntl(translate: TranslateService) {
        this.translate = translate;

        const paginatorIntl = new MatPaginatorIntl();

        this.translate.onLangChange.subscribe(() => {
            this.TranslateLabels(paginatorIntl);
        });

        this.TranslateLabels(paginatorIntl);

        return paginatorIntl;
    }

    TranslateLabels(paginatorIntl: MatPaginatorIntl) {
        //paginatorIntl.itemsPerPageLabel = this.translate.instant('ITEMS_PER_PAGE_LABEL');
        paginatorIntl.nextPageLabel = this.translate.instant('Paginator_NextPage');
        paginatorIntl.previousPageLabel = this.translate.instant('Paginator_PreviousPage');
        paginatorIntl.firstPageLabel = this.translate.instant('Paginator_FirstPage');
        paginatorIntl.lastPageLabel = this.translate.instant('Paginator_LastPage');
        //paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        this.changes.next();
    }

    // private getRangeLabel(page: number, pageSize: number, length: number): string {
    //     if (length === 0 || pageSize === 0) {
    //         return this.translate.instant('RANGE_PAGE_LABEL_1', { length });
    //     }
    //     length = Math.max(length, 0);
    //     const startIndex = page * pageSize;
    //     // If the start index exceeds the list length, do not try and fix the end index to the end.
    //     const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    //     return this.translate.instant('RANGE_PAGE_LABEL_2', { startIndex: startIndex + 1, endIndex, length });
    // }
}