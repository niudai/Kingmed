import { PageEvent, MatDialog } from '@angular/material';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IQArobot } from 'app/shared/model/q-arobot.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { QArobotService } from './q-arobot.service';
import { QArobotDeleteDialogComponent } from '.';

@Component({
    selector: 'jhi-q-arobot',
    templateUrl: './q-arobot.component.html',
    styleUrls: ['./q-arobot.component.css']
})
export class QArobotComponent implements OnInit, OnDestroy {
    PC_COL: string[] = ['ID', 'questionPC', 'disease', 'diseaseSeries', 'projectSeries'];
    MOBILE_COL: string[] = ['questionMobile', 'disease'];
    displayedColumns: string[];
    currentAccount: any;
    qArobots: IQArobot[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    pageEvent: PageEvent;
    isFocus: boolean;
    currentTimer: any;
    autoCompleteQArobots: IQArobot[];
    isInArea = false;

    constructor(
        protected qArobotService: QArobotService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected dialog: MatDialog
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        console.log('params initialized!!!!!!!');
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.columnToggle();
    }

    /**
     * change column to be displayed in terms of the width of device.
     */
    columnToggle() {
        if (window.innerWidth < 600) {
            this.displayedColumns = this.MOBILE_COL;
        } else {
            this.displayedColumns = this.PC_COL;
        }
    }

    onFocusSearchBox() {
        console.log('search box is focused');
        this.isFocus = true;
    }

    onBlurSearchBox() {
        console.log('search box is blured');
        this.isFocus = false;
    }

    // auto-complete query
    onKeyDown() {
        if (this.isFocus) {
            if (this.currentTimer) {
                window.clearTimeout(this.currentTimer);
            }
            this.currentTimer = window.setTimeout(
                any => {
                    console.log('auto completion query invoked!!');
                    console.log('Current search equals: ', this.currentSearch);
                    let params = new HttpParams();
                    params = params.set('size', '5');
                    if (this.currentSearch) {
                        params = params.set('query', this.currentSearch);
                    }
                    this.qArobotService
                    .search(params)
                    .subscribe(
                        (res: HttpResponse<IQArobot[]>) => this.autoCompleteQArobots = res.body,
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                },
                300
            );
        }
    }

    onMouseEnter() {
        console.log('mouse enters the search box area');
        this.isInArea = true;
    }

    onMouseLeave() {
        console.log('mouse leaves the search box area');
        this.isInArea = false;
    }

    openDialog(qA: IQArobot): void {
        const dialogRef = this.dialog.open(QArobotDeleteDialogComponent, {
            width: '250px',
            data: { qArobot: qA }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadAll();
        });
    }

    loadAll() {
        this.router.navigate(
            [
                '/q-arobot',
                {
                    page: this.pageEvent && this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                    size: this.pageEvent && this.pageEvent.pageSize ? this.pageEvent.pageSize : 10,
                    search: this.currentSearch
                }
            ],
            {
                queryParams: {
                    page: this.pageEvent && this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                    size: this.pageEvent && this.pageEvent.pageSize ? this.pageEvent.pageSize : 10
                }
            }
        );
        let params = new HttpParams();
        params = params.set('page', this.pageEvent.pageIndex.toString());
        params = params.set('size', this.pageEvent.pageSize.toString());
        if (this.currentSearch) {
            params = params.set('query', this.currentSearch);
        }
        this.qArobotService
            .search(params)
            .subscribe(
                (res: HttpResponse<IQArobot[]>) => this.paginateQArobots(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        return;
    }

    loadPage($event: PageEvent) {
        this.pageEvent = $event;
        this.loadAll();
    }

    ngOnInit() {
        if (this.accountService.hasAnyAuthority(['ROLE_ADMIN'])) {
            this.PC_COL.push('edit');
            this.PC_COL.push('delete');
        }
        this.pageEvent = new PageEvent();
        this.columnToggle();
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        // this.currentSearch = 'test';
        this.pageEvent.pageIndex =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['page'] ? this.activatedRoute.snapshot.params['page'] : 0;
        this.pageEvent.pageSize = ITEMS_PER_PAGE;
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQArobots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQArobot) {
        return item.id;
    }

    registerChangeInQArobots() {
        this.eventSubscriber = this.eventManager.subscribe('qArobotListModification', response => this.loadAll());
    }

    previousState() {
        window.history.back();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateQArobots(data: IQArobot[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.qArobots = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
