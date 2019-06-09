import { ServiceApplicationService } from './../service-application.service';
import { OperationService } from 'app/entities/operation/operation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'jhi-service-application-create',
    templateUrl: './service-application-create.component.html',
    styles: []
})
export class ServiceApplicationCreateComponent implements OnInit {

    // url for applications
    public applicationUrl = SERVER_API_URL + 'api/images/application';

    public applications: IFile[];

    public uploadResponse = { status: '', message: '', filePath: '' };

    isSaving: boolean;
    isAttached: boolean;
    fileForm: FormGroup;
    fileName: string; // file name.
    file: any;
    error: string;

    constructor(protected http: HttpClient,
        protected formBuilder: FormBuilder,
        public serviceApplicationService: ServiceApplicationService) { }

    ngOnInit() {
        this.isAttached = false;
        this.isSaving = false;
        this.fileForm = this.formBuilder.group({
            image: ['']
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            this.isAttached = true;
            const file = event.target.files[0];
            this.fileForm.get('image').setValue(file);
        }
    }

    onApplicationSubmit() {
        this.isSaving = true;
        const formData = new FormData();
        formData.append('image', this.fileForm.get('image').value);
        this.serviceApplicationService.upload(formData, this.fileName)
            .subscribe(
                res => this.uploadResponse = res,
                err => this.error = err,
            );

    }

    previousState() {
        window.history.back();
    }

}
