import { PageEvent } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared';
import { AccountService, UserService, User, IUser } from 'app/core';
import { UserMgmtDeleteDialogComponent } from 'app/admin';

@Component({
    selector: 'jhi-user-mgmt',
    templateUrl: './user-management.component.html'
})
export class UserMgmtComponent implements OnInit, OnDestroy {
    currentSearch: string;
    currentAccount: any;
    users: User[];
    error: any;
    success: any;
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
        private userService: UserService,
        private alertService: JhiAlertService,
        private accountService: AccountService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentSearch = '';
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    search(query: string) {
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/admin/user-management',
            {
                search: this.currentSearch,
                page: this.page,
                // sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    loadAll() {
        this.userService.search({
            page: this.pageEvent.pageIndex,
            query: this.currentSearch,
            size: this.pageEvent ? this.pageEvent.pageSize : 10
        })
        .subscribe(
            (res: HttpResponse<IUser[]>) => this.paginateUsers(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    paginateUsers(data: IUser[], headers: HttpHeaders) {
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.users = data;
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('userListModification', response => this.loadAll());
    }

    setActive(user, isActivated) {
        user.activated = isActivated;

        this.userService.update(user).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    // loadAll() {
    //     this.userService
    //         .query({
    //             page: this.page - 1,
    //             size: this.itemsPerPage,
    //             sort: this.sort()
    //         })
    //         .subscribe(
    //             (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
    //             (res: HttpResponse<any>) => this.onError(res.body)
    //         );
    // }

    trackIdentity(index, item: User) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/admin/user-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    deleteUser(user: User) {
        const modalRef = this.modalService.open(UserMgmtDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.user = user;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.users = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
