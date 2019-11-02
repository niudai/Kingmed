import { HttpClient, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';
import { map } from 'rxjs/operators';
import { createRequestOption } from 'app/shared';

@Injectable({
    providedIn: 'root'
})
export class ServicePlatformService {

    // url for applications
    public applicationUrl = SERVER_API_URL + 'api/images/platform';
    // public applicationSearchUrl = SERVER_API_URL + 'api/images/_search/application';

    constructor(protected http: HttpClient) { }

    upload(file: any, name: string, description: string) {
        let params = new HttpParams();
        params = params.set('name', name);
        params = params.set('description', description);
        return this.http.post<any>(`${this.applicationUrl}`, file,
            {
                params, // name of the file
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

    load(req?: any): Observable<HttpResponse<IFile[]>> {
        const options = createRequestOption(req);
        return this.http.get<IFile[]>(this.applicationUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.applicationUrl}/${id}`);
    }

    update(id: number, name: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.applicationUrl}/${id}/${name}`);
    }
}
