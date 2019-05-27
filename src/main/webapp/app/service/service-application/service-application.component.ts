import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

import { Component, OnInit } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IImage } from 'app/shared/model/image.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IFile } from 'app/shared/model/file.model';

@Component({
  selector: 'jhi-service-application',
  templateUrl: './service-application.component.html',
  styleUrls: ['./service-application.component.css']
})
export class ServiceApplicationComponent implements OnInit {

    // url for plain images.
    public resourceUrl = SERVER_API_URL + 'api/images';

    // url for applications
    public applicationUrl = SERVER_API_URL + 'api/images/application';

    fileForm: FormGroup;

    file: any;
    applications: IFile[];
    nameOfImages: string[];

    constructor(protected http: HttpClient,
            private formBuilder: FormBuilder) {
        this.getApplications();
    }

    delete(filename: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${filename}`, { observe: 'response' });
    }

    upload(file: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrl}`, file);
    }

    applicationUpload(file: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.applicationUrl}`, file);
    }

    // get all applications name and path
    getApplications(): Observable<HttpResponse<IFile[]>> {
        this.http.get<IFile[]>(this.applicationUrl)
            .subscribe(res => this.applications = res);
        return;
    }

    confirmDelete(filename: string) {
        this.delete(filename).subscribe(
            any => this.getApplications()
        );
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.fileForm.get('image').setValue(file);
        }
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('image', this.fileForm.get('image').value);
        this.upload(formData).subscribe(
            any => this.getApplications()
        );
    }

    onApplicationSubmit() {
        const formData = new FormData();
        formData.append('image', this.fileForm.get('image').value);
        this.applicationUpload(formData).subscribe(
            any => this.getApplications()
        );
    }

    ngOnInit() {
        this.fileForm = this.formBuilder.group({
            image: ['']
        });
    }

}
