import { ServicePlatformService } from '../service-platform.service';
import { OperationService } from 'app/entities/operation/operation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'jhi-service-platform-create',
    templateUrl: './service-platform-create.component.html',
    styles: []
})
export class ServicePlatformCreateComponent implements OnInit {

    // url for platforms
    public platformUrl = SERVER_API_URL + 'api/images/platform';

    public platforms: IFile[];

    public uploadResponse = { status: '', message: '', filePath: '' };

    isSaving: boolean;
    isAttached: boolean;
    fileForm: FormGroup;
    fileName: string; // file name.
    description: string;
    file: any;
    error: string;

    constructor(protected http: HttpClient,
        protected formBuilder: FormBuilder,
        public servicePlatformService: ServicePlatformService) { }

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

    onPlatformSubmit() {
        this.isSaving = true;
        const formData = new FormData();
        formData.append('image', this.fileForm.get('image').value);
        this.servicePlatformService.upload(formData, this.fileName, this.description)
            .subscribe(
                res => this.uploadResponse = res,
                err => this.error = err,
            );

    }

    previousState() {
        window.history.back();
    }

}
