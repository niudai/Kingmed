import { ServiceSuppliesService } from './service-supplies.service';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

import { Component, OnInit } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IImage } from 'app/shared/model/image.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IFile } from 'app/shared/model/file.model';
import { serviceApplictionRoute } from '../service-application/service-application.route';

@Component({
  selector: 'jhi-service-supplies',
  templateUrl: './service-supplies.component.html',
  styleUrls: ['./service-supplies.component.css']
})
export class ServiceSuppliesComponent implements OnInit {
    orderProp: string;
    reverse: boolean;
    filter: string;

    suppliess: IFile[];

    constructor(public service: ServiceSuppliesService) {
    }

    ngOnInit() {
        this.service.loadAll().subscribe(res => this.suppliess = res.body);
    }

    previousState() {
        window.history.back();
    }

}
