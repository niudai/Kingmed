import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'jhi-disease-xi-an',
    templateUrl: './disease-xi-an.component.html',
    styleUrls: ['./disease-xi-an.component.css']
})
export class DiseaseXiAnComponent implements OnInit, OnDestroy {
    PC_COL: string[] =  ['ID', 'namePC', 'price', 'projectConcourse', 'applications', 'suppliess',
    'qarobot', 'edit', 'delete'];
    MOBILE_COL: string[] = ['nameMobile', 'projectConcourse'];
    displayedColumns: string[];
    windowWidth = 1000;
    currentAccount: any;
    diseaseXiAns: IDiseaseXiAn[];
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
    constructor(
        protected diseaseXiAnService: DiseaseXiAnService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
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

    loadAll(pageIndex: number) {
        if (this.currentSearch) {
            this.diseaseXiAnService
                .search({
                    page: pageIndex,
                    query: this.currentSearch,
                    size: this.pageEvent ? this.pageEvent.pageSize : 10,
                    // sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IDiseaseXiAn[]>) => this.paginateDiseaseXiAns(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        } else {
            this.diseaseXiAns = null;
        }
        // this.diseaseXiAnService
        //     .query({
        //         page: this.page - 1,
        //         size: this.itemsPerPage,
        //         sort: this.sort()
        //     })
        //     .subscribe(
        //         (res: HttpResponse<IDiseaseXiAn[]>) => this.paginateDiseaseXiAns(res.body, res.headers),
        //         (res: HttpErrorResponse) => this.onError(res.message)
        //     );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition(page);
        }
    }

    loadDiseases($event: PageEvent) {
        // if ($event.pageIndex !== this.previousPage) {'
            this.page = $event.pageIndex;
            this.pageEvent = $event;
            this.previousPage = $event.pageIndex;
            this.transition($event.pageIndex);
        // }
    }

    transition(pageIndex: number) {
        this.router.navigate(['/disease-xi-an',
            {
                search: this.currentSearch,
                size: this.itemsPerPage,
                page: pageIndex,
            // sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
            ]);
        this.loadAll(pageIndex);
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.diseaseXiAns = null;
        this.router.navigate([
            '/disease-xi-an',
            {
                page: this.page,
                // sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
    }

    search(query: string) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/disease-xi-an',
            {
                search: this.currentSearch,
                page: this.page,
                // sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll(0);
    }

    ngOnInit() {
        this.columnToggle();
        this.itemsPerPage = ITEMS_PER_PAGE;
        // this.routeData = this.activatedRoute.data.subscribe(data => {
        //     this.page = data.pagingParams.page;
        //     this.previousPage = data.pagingParams.page;
        //     this.reverse = data.pagingParams.ascending;
        //     this.predicate = data.pagingParams.predicate;
        // });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        this.page =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['page']
            ? this.activatedRoute.snapshot.params['page']
                : '';
        this.loadAll(this.page);
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDiseaseXiAns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDiseaseXiAn) {
        return item.id;
    }

    registerChangeInDiseaseXiAns() {
        this.eventSubscriber = this.eventManager.subscribe('diseaseXiAnListModification', response => this.loadAll(this.pageEvent.pageIndex));
    }

    // sort() {
    //     const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    //     if (this.predicate !== 'id') {
    //         result.push('id');
    //     }
    //     return result;
    // }

    protected paginateDiseaseXiAns(data: IDiseaseXiAn[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.diseaseXiAns = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
