import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';

type EntityResponseType = HttpResponse<IDiseaseXiAn>;
type EntityArrayResponseType = HttpResponse<IDiseaseXiAn[]>;

@Injectable({ providedIn: 'root' })
export class DiseaseXiAnService {
    public resourceUrl = SERVER_API_URL + 'api/disease-xi-ans';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/disease-xi-ans';

    constructor(protected http: HttpClient) {}

    create(diseaseXiAn: IDiseaseXiAn): Observable<EntityResponseType> {
        return this.http.post<IDiseaseXiAn>(this.resourceUrl, diseaseXiAn, { observe: 'response' });
    }

    update(diseaseXiAn: IDiseaseXiAn): Observable<EntityResponseType> {
        return this.http.put<IDiseaseXiAn>(this.resourceUrl, diseaseXiAn, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiseaseXiAn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiseaseXiAn[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiseaseXiAn[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
