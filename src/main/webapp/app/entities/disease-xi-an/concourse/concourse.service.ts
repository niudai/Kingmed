import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IConcourse } from 'app/shared/model/concourse.model';
import { Injectable } from '@angular/core';
import { createRequestOption } from 'app/shared/util/request-util';

type ConcourseResponse = HttpResponse<IConcourse>;
type ConcourseArrayResponse = HttpResponse<IConcourse[]>;
@Injectable({ providedIn: 'root' })
export class ConcourseService {
    resourceUrl = SERVER_API_URL + 'api/concourse';
    constructor(private http: HttpClient) {}
    create(concourse: IConcourse): Observable<ConcourseResponse> {
        return this.http.post<IConcourse>(this.resourceUrl, concourse, { observe: 'response' });
    }
    update(concourse: IConcourse): Observable<ConcourseResponse> {
        return this.http.put<IConcourse>(this.resourceUrl, concourse, { observe: 'response' });
    }
    find(id: number): Observable<ConcourseResponse> {
        return this.http.get<IConcourse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req?: any): Observable<ConcourseArrayResponse> {
        const options = createRequestOption(req);
        return this.http.get<IConcourse[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    delete(id: number): Observable<ConcourseResponse> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
