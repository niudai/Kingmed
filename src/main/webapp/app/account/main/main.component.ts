import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { ActivatedRoute, Router, UrlSegment, PRIMARY_OUTLET, NavigationStart, NavigationEnd } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Account, AccountService, UserService } from 'app/core';
import { DiseaseXiAnDetailBottomSheetComponent } from 'app/entities/disease-xi-an/disease-xi-an-detail-bottom-sheet/disease-xi-an-detail-bottom-sheet.component';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IDiseaseBranch } from 'app/shared/model/disease-branch.model';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { MyDiseaseDeleteDialogComponent } from '../my-disease/my-disease-delete-dialog/my-disease-delete-dialog.component';
import { NavButton } from 'app/shared/model/nav-button.model';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styles: []
})
export class MainComponent implements OnInit {
    navButtons: NavButton[] = [
        { routerLink: 'disease', isSelected: false, content: '我的项目', icon: 'book-medical' },
        { routerLink: 'map', isSelected: false, content: '我的地图', icon: 'map-signs' }
    ];
    selectedBtn: NavButton;
    // <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
    currentAccount: Account;
    currentSubpage: string;

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

    ngOnInit() {
        const tree = this.router.parseUrl(this.router.url);
        const g = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.children['subpage'].segments;
        this.currentSubpage = s[0].path; // get current Subpage;
        console.log(s[0].path);
        this.routerEventSubscriber();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        console.log('**************************');
    }

    routerEventSubscriber() {
        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationEnd) {
                    const tree = this.router.parseUrl(this.router.url);
                    const g = tree.root.children[PRIMARY_OUTLET];
                    const s: UrlSegment[] = g.children['subpage'].segments;
                    this.currentSubpage = s[0].path; // get current Subpage;
                    console.log(`Hello World!!!!!!!!!!!!!!${this.currentSubpage}`);
                }
            }
        );
    }
}
