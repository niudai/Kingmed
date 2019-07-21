import { MatPaginatorIntl } from '@angular/material';

export class Paginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = '下一页';
    this.previousPageLabel = '上一页';
    this.itemsPerPageLabel = '每页条目数';
    this.lastPageLabel = '最后一页';
    this.firstPageLabel = '第一页';
  }
}
