import { HttpClient, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServiceSuppliesService {

    // url for suppliess
    public suppliesUrl = SERVER_API_URL + 'api/images/supplies';

    constructor(protected http: HttpClient) { }

    upload(file: any, name: string) {
        const options = name ?
            { params: new HttpParams().set('name', name), } : {};
        return this.http.post<any>(`${this.suppliesUrl}`, file,
            {
                params: new HttpParams().set('name', name), // name of the file
                reportProgress: true,
                observe: 'events'
            }).pipe(map(event => {

                switch (event.type) {

                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return { status: 'progress', message: progress };

                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return `Unhandled event: ${event.type}`;
                }
            }));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.suppliesUrl}/${id}`);
    }

    update(id: number, name: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.suppliesUrl}/${id}/${name}`);
    }

    loadAll(): Observable<HttpResponse<IFile[]>> {
        return this.http.get<IFile[]>(this.suppliesUrl, { observe: 'response' });
    }
}
