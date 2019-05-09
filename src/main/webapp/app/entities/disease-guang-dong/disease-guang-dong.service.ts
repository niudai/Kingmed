import { IPrice } from './../../shared/model/price.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';
import { $ } from 'protractor';

type EntityResponseType = HttpResponse<IDiseaseGuangDong>;
type EntityArrayResponseType = HttpResponse<IDiseaseGuangDong[]>;

@Injectable({ providedIn: 'root' })
export class DiseaseGuangDongService {
    public resourceUrl = SERVER_API_URL + 'api/disease-guang-dongs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/disease-guang-dongs';

    constructor(protected http: HttpClient) {}

    create(diseaseGuangDong: IDiseaseGuangDong): Observable<EntityResponseType> {
        return this.http.post<IDiseaseGuangDong>(this.resourceUrl, diseaseGuangDong, { observe: 'response' });
    }

    update(diseaseGuangDong: IDiseaseGuangDong): Observable<EntityResponseType> {
        return this.http.put<IDiseaseGuangDong>(this.resourceUrl, diseaseGuangDong, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiseaseGuangDong>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiseaseGuangDong[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    addNewPrice(id: number, price: IPrice): Observable<EntityResponseType> {
        return this.http.post<IPrice>(`${this.resourceUrl}/addPrice/${id}`, price, { observe: 'response'});
    }

    deletePrice(id: number): Observable<EntityResponseType> {
        return this.http.delete<any>(`${this.resourceUrl}/deletePrice/${id}`);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiseaseGuangDong[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
