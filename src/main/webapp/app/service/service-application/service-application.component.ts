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
    PC_COL: string[] =  ['ID', 'namePC', 'price', 'projectConcourse', 'applications', 'suppliess',
    'qarobot'];
    MOBILE_COL: string[] = ['nameMobile', 'projectConcourse'];
    displayedColumns: string[];

    orderProp: string;
    reverse: boolean;
    filter: string;
    applications: IFile[];
    pageEvent: PageEvent;
    currentAccount: any;
    currentSearch: string;

    constructor(public service: ServiceApplicationService) {}

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
        if (this.currentSearch) {
            this.service.
        }
    }

    ngOnInit() {
        this.service.loadAll().subscribe(res => this.applications = res.body);
    }

    previousState() {
        window.history.back();
    }

}
