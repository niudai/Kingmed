import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { ISubsidiary } from 'app/shared/model/subsidiary.model';
import { Injectable } from '@angular/core';
import { createRequestOption } from 'app/shared/util/request-util';

type SubsidiaryResponse = HttpResponse<ISubsidiary>;
type SubsidiaryArrayResponse = HttpResponse<ISubsidiary[]>;
@Injectable({ providedIn: 'root' })
export class SubsidiaryService {
    resourceUrl = SERVER_API_URL + 'api/subsidiary';
    constructor(private http: HttpClient) {}
    create(subsidiary: ISubsidiary): Observable<SubsidiaryResponse> {
        return this.http.post<ISubsidiary>(this.resourceUrl, subsidiary, { observe: 'response' });
    }
    update(subsidiary: ISubsidiary): Observable<SubsidiaryResponse> {
        return this.http.put<ISubsidiary>(this.resourceUrl, subsidiary, { observe: 'response' });
    }
    find(id: number): Observable<SubsidiaryResponse> {
        return this.http.get<ISubsidiary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req?: any): Observable<SubsidiaryArrayResponse> {
        const options = createRequestOption(req);
        return this.http.get<ISubsidiary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    delete(id: number): Observable<SubsidiaryResponse> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
