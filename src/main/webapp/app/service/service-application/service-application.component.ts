import { HttpResponse } from '@angular/common/http';
import { ServiceApplicationService } from './service-application.service';
import { SERVER_API_URL } from 'app/app.constants';

import { Component, OnInit, HostListener } from '@angular/core';
import { IFile } from 'app/shared/model/file.model';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'jhi-service-application',
    templateUrl: './service-application.component.html',
    styleUrls: ['./service-application.component.css']
})
export class ServiceApplicationComponent implements OnInit {
    PC_COL: string[] = ['ID', 'name', 'view', 'edit', 'delete'];
    MOBILE_COL: string[] = ['ID', 'name'];
    displayedColumns: string[];
    totalItems: number;
    orderProp: string;
    reverse: boolean;
    filter: string;
    applications: IFile[];
    pageEvent: PageEvent;
    currentAccount: any;
    currentSearch: string;

    constructor(public service: ServiceApplicationService) { }

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

    load() {
        if (this.currentSearch) {
            this.service.search(
                {
                    query: this.currentSearch,
                    page: this.pageEvent && this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                    size: this.pageEvent && this.pageEvent.pageSize ? this.pageEvent.pageSize : 10
                }
            ).subscribe((res: HttpResponse<IFile[]>) => this.loadSuccessHandler(res));
        } else {
            this.service.load(
                {
                    page: this.pageEvent && this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                    size: this.pageEvent && this.pageEvent.pageSize ? this.pageEvent.pageSize : 10
                }
            ).subscribe((res: HttpResponse<IFile[]>) => this.loadSuccessHandler(res));
        }
    }

    loadSuccessHandler(res: HttpResponse<IFile[]>) {
        this.applications = res.body;
        this.totalItems = +res.headers.get('X-Total-Count');
    }

    paginate($event: PageEvent) {
        this.pageEvent = $event;
        this.load();
    }

    ngOnInit() {
        this.load();
        this.displayedColumns = this.PC_COL;
    }

    previousState() {
        window.history.back();
    }

}
