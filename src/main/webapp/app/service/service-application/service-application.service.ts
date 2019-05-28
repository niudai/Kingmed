import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServiceApplicationService {

    // url for applications
    public applicationUrl = SERVER_API_URL + 'api/images/application';

    constructor(protected http: HttpClient) { }

    upload(file: any, name: string): Observable<HttpResponse<any>> {
        const options = name ?
        { params: new HttpParams().set('name', name) } : {};
        return this.http.post<any>(`${this.applicationUrl}`, file, options);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.applicationUrl}/${id}`);
    }

    update(id: number, name: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.applicationUrl}/${id}/${name}`);
    }
}
