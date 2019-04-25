import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

import { Component, OnInit } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IImage } from 'app/shared/model/image.model';

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
    file: any;
    images: IImage[];
    nameOfImages: string[];

    constructor(protected http: HttpClient) {
        this.http.get<IImage[]>(this.resourceUrl)
            .subscribe(
                res => this.images = res
            );
        this.http.get<string[]>(this.resourceUrlOfNames)
            .subscribe(
                res => this.nameOfImages = res
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client side or network error occured.
            console.error('An error occured', error.error.message);
        } else {
            // the backend returned an unsuccessful response code.
            // the response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');

    }

    delete(filename: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${filename}`, { observe: 'response' });
    }

    upload(file: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrl}`, file);
    }

    confirmDelete(filename: string) {
        this.delete(filename).subscribe();
    }

    confirmUpload(file: any) {
        this.upload(file).subscribe();
    }

    ngOnInit() {

    }

}
