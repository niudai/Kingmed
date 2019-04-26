import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

import { Component, OnInit } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IImage } from 'app/shared/model/image.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'jhi-service',
    templateUrl: './service.component.html',
    styleUrls: ['service.css']
})
export class ServiceComponent implements OnInit {
    //   public resourceUrl = SERVER_API_URL + 'api/images';
    public resourceUrl = 'files/images';
    public resourceUrlOfNames = 'files/imagesName';
    //   public resourceUrl = 'api/images';
    fileForm: FormGroup;

    file: any;
    images: IImage[];
    nameOfImages: string[];

    constructor(protected http: HttpClient,
            private formBuilder: FormBuilder) {
        this.getImages();
    }

    delete(filename: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${filename}`, { observe: 'response' });
    }

    upload(file: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrl}`, file);
    }

    getImages(): Observable<HttpResponse<IImage[]>> {
        this.http.get<IImage[]>(this.resourceUrl)
            .subscribe(res => this.images = res);
        return;
    }

    confirmDelete(filename: string) {
        this.delete(filename).subscribe();
        this.getImages();
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
        this.upload(formData).subscribe();
        this.getImages();
    }

    ngOnInit() {
        this.fileForm = this.formBuilder.group({
            image: ['']
        });
    }

}
