import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQArobot } from 'app/shared/model/q-arobot.model';

type EntityResponseType = HttpResponse<IQArobot>;
type EntityArrayResponseType = HttpResponse<IQArobot[]>;

@Injectable({ providedIn: 'root' })
export class QArobotService {
    public resourceUrl = SERVER_API_URL + 'api/q-arobots';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/q-arobots';

    constructor(protected http: HttpClient) {}

    create(qArobot: IQArobot): Observable<EntityResponseType> {
        return this.http.post<IQArobot>(this.resourceUrl, qArobot, { observe: 'response' });
    }

    update(qArobot: IQArobot): Observable<EntityResponseType> {
        return this.http.put<IQArobot>(this.resourceUrl, qArobot, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQArobot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQArobot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQArobot[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
