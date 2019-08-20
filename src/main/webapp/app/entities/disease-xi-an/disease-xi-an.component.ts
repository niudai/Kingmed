import { ISubsidiary as string, Subsidiary } from './../../shared/model/subsidiary.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { PageEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet } from '@angular/material';
import { DiseaseXiAnGiveDialogComponent } from './disease-xi-an-give-dialog/disease-xi-an-give-dialog.component';
import { DiseaseXiAnDetailBottomSheetComponent } from './disease-xi-an-detail-bottom-sheet/disease-xi-an-detail-bottom-sheet.component';

@Component({
    selector: 'jhi-disease-xi-an',
    templateUrl: './disease-xi-an.component.html',
    styleUrls: ['./disease-xi-an.component.css']
})
export class DiseaseXiAnComponent implements OnInit {
    PC_COL: string[] = ['ID', 'namePC', 'price', 'projectConcourse', 'applications', 'suppliess',
        'qarobot', 'give'];
    MOBILE_COL: string[] = ['nameMobile', 'projectConcourse'];
    displayedColumns: string[];
    NO_SPECIFIED = '不限定';
    windowWidth = 1000;
    currentAccount: any;
    diseaseXiAns: IDiseaseXiAn[];
    subsidiaries: string[];
    selectedSub: string;
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
    protected ngbModalRef: NgbModalRef;
    constructor(
        protected diseaseXiAnService: DiseaseXiAnService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected matDialog: MatDialog,
        protected modalService: NgbModal,
        protected dialog: MatDialog,
        private _bottomSheet: MatBottomSheet
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

    loadAll() {
        this.router.navigate(['/disease-xi-an',
            {
                search: this.currentSearch,
                size: this.itemsPerPage,
                page: this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                subsidiary: this.selectedSub
            }
        ]);
        this.diseaseXiAnService.getAllSubsidiary().subscribe(
            res => {
                this.subsidiaries = res.map(sub => sub.name);
                this.subsidiaries.push(this.NO_SPECIFIED);
            }
        );

        this.diseaseXiAnService.query({
            page: this.pageEvent.pageIndex,
            query: this.currentSearch ? this.currentSearch : '',
            subsidiary: this.selectedSub === this.NO_SPECIFIED ? '' : this.selectedSub,
            // subsidiary: this.selectedSub ? this.selectedSub.name : null,
            // projectConcourse: null,
            size: this.pageEvent.pageSize,
            // sort: this.sort()
        })
            .subscribe(
                (res: HttpResponse<IDiseaseXiAn[]>) => this.paginateDiseaseXiAns(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        return;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadAll();
        }
    }

    loadDiseases($event: PageEvent) {
        this.pageEvent = $event;
        this.loadAll();
    }

    search() {
        this.page = 0;
        this.loadAll();
    }

    openDeleteDialog(disease: IDiseaseXiAn): void {
        const dialogRef = this.dialog.open(DiseaseXiAnMatDeleteDialogComponent, {
            width: '250px',
            data: { diseaseXiAn: disease }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadAll();
        });
    }

    openGiveDialog(disease: IDiseaseXiAn): void {
        const dialogRef = this.dialog.open(DiseaseXiAnGiveDialogComponent, {
            width: '250px',
            data: { diseaseXiAn: disease }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadAll();
        });
    }

    openDetailBottomSheet(disease: IDiseaseXiAn): void {
        const bottomSheetRef = this._bottomSheet.open(DiseaseXiAnDetailBottomSheetComponent, {
            data: { diseaseXiAn: disease }
        });

        bottomSheetRef.afterDismissed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadAll();
        });
    }

    ngOnInit() {
        if (this.accountService.hasAnyAuthority(['ROLE_ADMIN'])) {
            this.PC_COL.push('edit');
            this.PC_COL.push('delete');
        }
        if (this.accountService.hasAnyAuthority(['ROLE_DOCTOR'])) {
            this.PC_COL = this.PC_COL.filter(any => any !== 'projectConcourse');
            this.MOBILE_COL = this.MOBILE_COL.filter(any => any !== 'projectConcourse');
        }
        this.columnToggle();
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        this.selectedSub =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['subsidiary']
                ? this.activatedRoute.snapshot.params['subsidiary']
                : this.NO_SPECIFIED;
        this.pageEvent = new PageEvent();
        this.pageEvent.pageIndex =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['page']
                ? +this.activatedRoute.snapshot.params['page']
                : 0;
        this.pageEvent.pageSize = ITEMS_PER_PAGE;
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }

    trackId(index: number, item: IDiseaseXiAn) {
        return item.id;
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

@Component({
    selector: 'jhi-disease-xi-an-delete-dialog',
    templateUrl: './disease-xi-an-delete-dialog.component.html'
})
export class DiseaseXiAnMatDeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DiseaseXiAnMatDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: DiseaseXiAnService,
        protected router: Router) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.delete(this.data.diseaseXiAn.id).subscribe(
            any => this.dialogRef.close()
        );
    }
}
