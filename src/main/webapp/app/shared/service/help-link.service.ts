import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IHelpLink } from 'app/shared/model/help-link.model';
import { Injectable } from '@angular/core';

type HelpLinkResponse = HttpResponse<IHelpLink>;
@Injectable({ providedIn: 'root' })
export class HelpLinkService {
    resourceUrl = SERVER_API_URL + 'api/help-links';
    constructor(private http: HttpClient) {}
    create(concourse: IHelpLink): Observable<HelpLinkResponse> {
        return this.http.post<IHelpLink>(this.resourceUrl, concourse, { observe: 'response' });
    }
    update(concourse: IHelpLink): Observable<HelpLinkResponse> {
        return this.http.put<IHelpLink>(this.resourceUrl , concourse, { observe: 'response' });
    }
    get(): Observable<any> {
        return this.http.get<IHelpLink[]>(this.resourceUrl, { observe: 'response' });
    }
    delete(id: number): Observable<HelpLinkResponse> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
