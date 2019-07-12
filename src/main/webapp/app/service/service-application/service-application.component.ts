import { ServiceApplicationService } from './service-application.service';
import { SERVER_API_URL } from 'app/app.constants';

import { Component, OnInit } from '@angular/core';
import { IFile } from 'app/shared/model/file.model';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'jhi-service-application',
  templateUrl: './service-application.component.html',
  styleUrls: ['./service-application.component.css']
})
export class ServiceApplicationComponent implements OnInit {

    orderProp: string;
    reverse: boolean;
    filter: string;
    applications: IFile[];
    pageEvent: PageEvent;

    constructor(public service: ServiceApplicationService) {}



    ngOnInit() {
        this.service.loadAll().subscribe(res => this.applications = res.body);
    }

    previousState() {
        window.history.back();
    }

}
