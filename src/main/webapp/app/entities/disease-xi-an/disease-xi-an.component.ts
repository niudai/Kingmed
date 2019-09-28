import { ISubsidiary as string, Subsidiary, ISubsidiary } from './../../shared/model/subsidiary.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { PageEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet, MatChipSelectionChange } from '@angular/material';
import { DiseaseXiAnGiveDialogComponent } from './disease-xi-an-give-dialog/disease-xi-an-give-dialog.component';
import { DiseaseXiAnDetailBottomSheetComponent } from './disease-xi-an-detail-bottom-sheet/disease-xi-an-detail-bottom-sheet.component';
import { DiseaseXiAnMatDeleteDialogComponent } from '.';
import { ISort, DiseaseSorts } from 'app/shared/util/disease-util';
import { IConcourse } from 'app/shared/model/concourse.model';
import { CreateComponent } from './concourse/create-dialog/create-dialog.component';
import { CreateDialogComponent } from './subsidiary/create/create.component';
import { ConcourseService } from './concourse/concourse.service';
import { SubsidiaryService } from './subsidiary/subsidiary.service';

@Component({
    selector: 'jhi-disease-xi-an',
    templateUrl: './disease-xi-an.component.html',
    styleUrls: ['./disease-xi-an.component.css']
})
export class DiseaseXiAnComponent implements OnInit {
    PC_COL: string[] = ['ID', 'namePC', 'price', 'applications', 'suppliess', 'qarobot'];
    MOBILE_COL: string[] = ['nameMobile'];
    displayedColumns: string[];
    NO_SPECIFIED = '不限定';
    windowWidth = 1000;
    currentAccount: any;
    diseaseSorts: ISort[];
    selectedSort: string;
    selectedConcourse: IConcourse;
    diseaseXiAns: IDiseaseXiAn[];
    autoCompleteDiseases: IDiseaseXiAn[];
    subsidiaries: ISubsidiary[];
    concourses: IConcourse[];
    selectedSub: ISubsidiary;
    isBigScreen = true;
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
    isFocus = false;
    currentTimer: number; // used to count down to make search request to server
    protected ngbModalRef: NgbModalRef;
    isInArea = false;
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
        private _bottomSheet: MatBottomSheet,
        private concourseService: ConcourseService,
        private subsidiaryService: SubsidiaryService
    ) {}

    @HostListener('window:resize',  ['$event'])
    onResize(event) {
        this.columnToggle();
    }

    /**
     * change column to be displayed in terms of the width of device.
     */
    columnToggle() {
        if (window.innerWidth < 600) {
            this.isBigScreen = false;
            this.displayedColumns = this.MOBILE_COL;
        } else {
            this.isBigScreen = true;
            this.displayedColumns = this.PC_COL;
        }
    }

    onFocusSearchBox() {
        console.log('search box is focused');
        this.isFocus = true;
    }

    onMouseEnter() {
        console.log('mouse enters the search box area');
        this.isInArea = true;
    }

    onMouseLeave() {
        console.log('mouse leaves the search box area');
        this.isInArea = false;
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
                    this.diseaseXiAnService
                    .query(params)
                    .subscribe(
                        (res: HttpResponse<IDiseaseXiAn[]>) => this.autoCompleteDiseases = res.body,
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                },
                300
            );
        }
    }

    transition() {
        this.router.navigate([
            '/disease-xi-an',
            {
                search: this.currentSearch,
                size: this.itemsPerPage,
                page: this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                sort: this.selectedSort,
                subsidiary: this.selectedSub,
                'concourse.pseudoId': this.selectedConcourse ?
                    this.selectedConcourse.pseudoId : null,
                'concourse.name': this.selectedConcourse ?
                    this.selectedConcourse.name : null
            }
        ]);
    }

    loadDiseases() {
        let params = new HttpParams();
        params = params.set('page', this.pageEvent.pageIndex.toString());
        params = params.set('size', this.pageEvent.pageSize.toString());
        if (this.currentSearch) {
            params = params.set('query', this.currentSearch);
        }
        if (this.selectedSub && this.selectedSub.id) {
            params = params.set('subsidiaryId', this.selectedSub.id.toString());
        }
        if (this.selectedSort) {
            params = params.set('sort', this.selectedSort);
        }
        if (this.selectedConcourse && this.selectedConcourse.name !== this.NO_SPECIFIED) {
            params = params.set('concourse.pseudoId', this.selectedConcourse.pseudoId.toString());
        }
        this.diseaseXiAnService
            .query(params)
            .subscribe(
                (res: HttpResponse<IDiseaseXiAn[]>) => this.paginateDiseaseXiAns(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        console.log('Diseases fetched');
        return;
    }

    loadSubsidiaries() {
        this.diseaseXiAnService.getAllSubsidiary().subscribe(res => {
            this.subsidiaries = res;
            this.subsidiaries.push({ name: this.NO_SPECIFIED });
        });
    }

    loadConcourses() {
        this.concourseService.query().subscribe(res => {

            this.concourses = res.body._embedded.concourse.map(
                c => {
                    c.isSelected = false;
                    return c;
                }
            );
            this.selectedConcourse = { name: this.NO_SPECIFIED, isSelected: true };
            this.concourses.push(this.selectedConcourse);
        });
    }

    onPagination($event: PageEvent) {
        this.pageEvent = $event;
        this.transition();
        this.loadDiseases();
    }

    search() {
        this.pageEvent.pageIndex = 0;
        this.transition();
        this.loadDiseases();
    }

    selectConcourse(concourse: IConcourse) {
        console.log('The selected concourse is :');
        console.log(this.selectedConcourse);
        this.selectedConcourse.isSelected = false;
        this.selectedConcourse = concourse;
        this.selectedConcourse.isSelected = true;
        this.loadDiseases();
    }

    openDeleteDialog(disease: IDiseaseXiAn): void {
        const dialogRef = this.dialog.open(DiseaseXiAnMatDeleteDialogComponent, {
            width: '500px',
            data: { diseaseXiAn: disease }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadDiseases();
        });
    }

    openConcourseDialog(): void {
        const dialogRef = this.dialog.open(CreateComponent, {
            width: '500px',
            data: { concourse: { name: ''} }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.concourseService.create(result)
                .subscribe(
                    any => this.loadConcourses()

                );
        });
    }

    openGiveDialog(disease: IDiseaseXiAn): void {
        const dialogRef = this.dialog.open(DiseaseXiAnGiveDialogComponent, {
            width: '250px',
            data: { diseaseXiAn: disease }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadDiseases();
        });
    }

    openDetailBottomSheet(disease: IDiseaseXiAn): void {
        const bottomSheetRef = this._bottomSheet.open(DiseaseXiAnDetailBottomSheetComponent, {
            data: { diseaseXiAn: disease }
        });

        bottomSheetRef.afterDismissed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadDiseases();
        });
    }

    ngOnInit() {
        this.diseaseSorts = DiseaseSorts;
        if (this.accountService.hasAnyAuthority(['ROLE_ADMIN'])) {
            this.PC_COL.push('give');
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
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['page'] ? +this.activatedRoute.snapshot.params['page'] : 0;
        this.selectedSort =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['sort']
                ? this.activatedRoute.snapshot.params['sort']
                : this.diseaseSorts[0].sort;
        this.pageEvent.pageSize = ITEMS_PER_PAGE;
        this.loadConcourses();
        this.loadSubsidiaries();
        this.loadDiseases();
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
