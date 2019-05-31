import { ServiceSuppliesService } from './../service-supplies.service';
import { OperationService } from 'app/entities/operation/operation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';

@Component({
    selector: 'jhi-service-supplies-create',
    templateUrl: './service-supplies-create.component.html',
    styles: []
})
export class ServiceSuppliesCreateComponent implements OnInit {

    // url for suppliess
    public suppliesUrl = SERVER_API_URL + 'api/images/supplies';

    public suppliess: IFile[];

    fileForm: FormGroup;
    fileName: string; // file name.
    file: any;

    constructor(protected http: HttpClient,
        protected formBuilder: FormBuilder,
        public serviceSuppliesService: ServiceSuppliesService) { }

    ngOnInit() {
        this.fileForm = this.formBuilder.group({
            image: ['']
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.fileForm.get('image').setValue(file);
        }
    }

    onSuppliesSubmit() {
        const formData = new FormData();
        formData.append('image', this.fileForm.get('image').value);
        this.serviceSuppliesService.upload(formData, this.fileName)
            .subscribe(
                any => window.history.back()
            );

    }

    previousState() {
        window.history.back();
    }

}
