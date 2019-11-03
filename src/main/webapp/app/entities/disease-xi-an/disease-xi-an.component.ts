import { HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IConcourse } from 'app/shared/model/concourse.model';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { DiseaseSorts, ISort } from 'app/shared/util/disease-util';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { DiseaseXiAnMatDeleteDialogComponent } from '.';
import { ISubsidiary } from './../../shared/model/subsidiary.model';
import { ConcourseService } from './concourse/concourse.service';
import { CreateComponent } from './concourse/create-dialog/create-dialog.component';
import { DiseaseXiAnDetailBottomSheetComponent } from './disease-xi-an-detail-bottom-sheet/disease-xi-an-detail-bottom-sheet.component';
import { DiseaseXiAnGiveDialogComponent } from './disease-xi-an-give-dialog/disease-xi-an-give-dialog.component';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { SubsidiaryService } from './subsidiary/subsidiary.service';

@Component({
    selector: 'jhi-disease-xi-an',
    templateUrl: './disease-xi-an.component.html',
    styleUrls: ['./disease-xi-an.component.css'],
    // encapsulation: ViewEncapsulation.None
})
export class DiseaseXiAnComponent implements OnInit {
    PC_COL: string[] = ['ID', 'namePC', 'price', 'applications', 'suppliess', 'qarobot'];
    MOBILE_COL: string[] = ['nameMobile'];
    displayedColumns: string[];
    NO_SPECIFIED = '不限定';
    windowWidth = window.innerWidth;
    currentAccount: any;
    diseaseSorts: ISort[];
    selectedSort: string;
    selectedConcourse: IConcourse;
    selectedConcourseId: number;
    diseaseXiAns: IDiseaseXiAn[];
    autoCompleteDiseases: IDiseaseXiAn[];
    subsidiaries: ISubsidiary[];
    concourses: IConcourse[];
    selectedSub: ISubsidiary;
    selectedSubId: number;
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
    matrixParams: any = {}; // matrixParams
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
        private concourseService: ConcourseService
    ) {}

    @HostListener('window:resize', ['$event'])
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
            this.currentTimer = window.setTimeout(any => {
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
                        (res: HttpResponse<IDiseaseXiAn[]>) => (this.autoCompleteDiseases = res.body),
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
            }, 300);
        }
    }

    transition() {
        this.router.navigate([
            '/disease-xi-an',
            this.matrixParams
        ]);
    }

    loadDiseases() {
        let params = new HttpParams();
        params = params.set('page', this.pageEvent.pageIndex.toString());
        params = params.set('size', this.pageEvent.pageSize.toString());
        if (this.currentSearch) {
            params = params.set('query', this.currentSearch);
        }
        if (this.matrixParams['subsidiary']) {
            params = params.set('subsidiaryId', this.matrixParams['subsidiary'].toString());
        }
        if (this.selectedSort) {
            params = params.set('sort', this.selectedSort);
        }
        if (this.matrixParams['concourse.pseudoId']) {
            params = params.set('concourse.pseudoId', this.matrixParams['concourse.pseudoId'].toString());
        }
        this.diseaseXiAnService
            .query(params)
            .subscribe(
                (res: HttpResponse<IDiseaseXiAn[]>) => this.paginateDiseaseXiAns(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        return;
    }

    loadSubsidiaries() {
        this.diseaseXiAnService.getAllSubsidiary().subscribe(res => {
            this.subsidiaries = res;
            this.subsidiaries.push({ name: this.NO_SPECIFIED });
            if (this.matrixParams['subsidiary']) {
                this.selectedSub = this.subsidiaries.find( s => s.id === +this.matrixParams['subsidiary']);
            }
        });
    }

    loadConcourses() {
        this.concourseService.query().subscribe(res => {
            this.concourses = res.body._embedded.concourse.map(c => {
                c.isSelected = false;
                return c;
            });
        });
    }

    onPagination($event: PageEvent) {
        if ($event) {
            this.pageEvent = $event;
        }
        this.matrixParams.size = this.pageEvent.pageSize;
        this.matrixParams.page = this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0;
        this.transition();
        this.loadDiseases();
    }

    search() {
        this.pageEvent.pageIndex = 0;
        this.matrixParams.search = this.currentSearch;
        this.transition();
        this.loadDiseases();
    }

    selectSub() {
        if (this.selectedSub.id) {
            this.matrixParams.subsidiary = this.selectedSub.id;
        } else {
            delete this.matrixParams.subsidiary;
        }
        this.transition();
        this.loadDiseases();
    }

    selectSort() {
        this.matrixParams.sort = this.selectedSort;
        this.transition();
        this.loadDiseases();
    }

    selectConcourse(concourse: IConcourse) {
        console.log(this.selectedConcourse);
        if (concourse) {
            this.selectedConcourseId = concourse.pseudoId;
            this.matrixParams['concourse.pseudoId'] = concourse.pseudoId;
        } else {
            delete this.matrixParams['concourse.pseudoId'];

        }
        this.transition();
        this.loadDiseases();
    }

    stopBubbling($event: Event) {
        $event.stopPropagation();
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
            data: { concourse: { name: '' } }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.concourseService.create(result).subscribe(any => this.loadConcourses());
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

    openDetailBottomSheet(event: Event, disease: IDiseaseXiAn): void {
        event.stopPropagation();
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
        const params = this.activatedRoute.snapshot.params;
        Object.keys(params).forEach(
            key => {
                this.matrixParams[key] = params[key];
            }
        );
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        // this.selectedSubId =
        //     this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['subsidiary']
        //         ? this.activatedRoute.snapshot.params['subsidiary']
        //         : undefined;
        // this.selectedConcourseId =
        // this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['concourse.pseudoId']
        //     ? +this.activatedRoute.snapshot.params['concourse.pseudoId']
        //     : undefined;
        this.pageEvent = new PageEvent();
        this.pageEvent.pageIndex =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['page'] ? +this.activatedRoute.snapshot.params['page'] : 0;
        this.selectedSort =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['sort']
                ? this.activatedRoute.snapshot.params['sort']
                : this.diseaseSorts[2].sort;
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
