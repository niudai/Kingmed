import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { INotification } from 'app/shared/model/notification.model';
import { createRequestOption } from 'app/shared';

type NotificationResponse = HttpResponse<INotification>;
type NotificationArrayResponse = HttpResponse<INotification[]>;
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    resourceUrl = SERVER_API_URL + 'api/project-notifications';
    constructor(private http: HttpClient) {}
    create(label: INotification): Observable<NotificationResponse> {
        return this.http.post<INotification>(this.resourceUrl, label, { observe: 'response' });
    }
    update(label: INotification): Observable<NotificationResponse> {
        return this.http.put<INotification>(this.resourceUrl, label, { observe: 'response' });
    }
    find(id: number): Observable<NotificationResponse> {
        return this.http.get<INotification>(`${this.resourceUrl}/id`, { observe: 'response' });
    }
    query(req?: any): Observable<NotificationArrayResponse> {
        const options = createRequestOption(req);
        return this.http.get<INotification[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    search(params?: HttpParams): Observable<NotificationArrayResponse> {
        return this.http.get<INotification[]>(`${this.resourceUrl}/_search`, { params, observe: 'response' });
    }
    delete(id: number): Observable<NotificationResponse> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
