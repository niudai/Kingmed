import { Account } from './../../../core/user/account.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { AccountService, UserService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PageEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet, ErrorStateMatcher } from '@angular/material';
import { MyDiseaseDeleteDialogComponent } from '../my-disease-delete-dialog/my-disease-delete-dialog.component';
import { DiseaseXiAnDetailBottomSheetComponent } from 'app/entities/disease-xi-an/disease-xi-an-detail-bottom-sheet/disease-xi-an-detail-bottom-sheet.component';
import { FormControl, Validators } from '@angular/forms';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';

@Component({
    selector: 'jhi-my-disease',
    templateUrl: './my-disease.component.html',
    styleUrls: ['./my-disease.component.css']
})
export class MyDiseaseComponent implements OnInit {
    PC_COL: string[] = ['ID', 'namePC', 'price', 'applications', 'suppliess', 'qarobot'];
    MOBILE_COL: string[] = ['nameMobile'];
    displayedColumns: string[];
    windowWidth = 1000;
    currentAccount: Account;
    diseaseXiAns: IDiseaseXiAn[];
    diseaseBranches: IDiseaseBranch[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    pageEvent: PageEvent;
    protected ngbModalRef: NgbModalRef;
    isBigScreen: boolean;

    constructor(
        protected userService: UserService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected matDialog: MatDialog,
        protected modalService: NgbModal,
        protected dialog: MatDialog,
        protected _bottomSheet: MatBottomSheet
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

    loadAll() {
        this.router.navigate([
            '/account/my-disease',
            {
                // search: this.currentSearch,
                size: this.pageEvent.pageSize ? this.pageEvent.pageSize : ITEMS_PER_PAGE,
                page: this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0
            }
        ]);
        this.userService
            .getDiseases(this.currentAccount.login, {
                page: this.pageEvent && this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                size: this.pageEvent && this.pageEvent.pageSize ? this.pageEvent.pageSize : ITEMS_PER_PAGE
                // sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDiseaseXiAn[]>) => this.paginateDiseaseXiAns(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.userService
            .getDiseaseBranches(this.currentAccount.login)
                .subscribe(
                    res => this.diseaseBranches = res
            );
        return;
    }

    loadDiseases($event: PageEvent) {
        this.pageEvent = $event;
        this.loadAll();
    }

    search() {
        this.pageEvent.pageIndex = 0;
        this.loadAll();
    }

    openDeleteDialog(disease: IDiseaseXiAn): void {
        const dialogRef = this.dialog.open(MyDiseaseDeleteDialogComponent, {
            width: '250px',
            data: {
                account: this.currentAccount,
                diseaseXiAn: disease
            }
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
        this.pageEvent = new PageEvent();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
        });
        // this.pageEvent.pageIndex =
        //     this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['page']
        //         ? this.activatedRoute.snapshot.params['page']
        //         : 0;
    }

    trackId(index: number, item: IDiseaseXiAn) {
        return item.id;
    }

    protected paginateDiseaseXiAns(data: IDiseaseXiAn[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.diseaseXiAns = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
