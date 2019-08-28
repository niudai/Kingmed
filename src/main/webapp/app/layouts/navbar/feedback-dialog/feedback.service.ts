import { Injectable } from '@angular/core';
import { IFeedback } from 'app/shared/model/feedback.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

type FeedbackResponse = HttpResponse<IFeedback>;
type FeedbackArrayResponse = HttpResponse<IFeedback[]>;
@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    resourceUrl = SERVER_API_URL + 'api/feedback';
    constructor(private http: HttpClient) { }
    create(label: IFeedback): Observable<FeedbackResponse> {
        return this.http.post<IFeedback>(this.resourceUrl, label, { observe: 'response' });
    }
    update(label: IFeedback): Observable<FeedbackResponse> {
        return this.http.put<IFeedback>(this.resourceUrl, label, { observe: 'response' });
    }
    find(id: number): Observable<FeedbackResponse> {
        return this.http.get<IFeedback>(`${this.resourceUrl}/id`, { observe: 'response' });
    }
    query(req?: any): Observable<any> {
        // const options = createRequestOption(req);
        return this.http.get<any>(this.resourceUrl, { observe: 'response' });
    }
    delete(id: number): Observable<FeedbackResponse> {
        return this.http.delete<any>(`${this.resourceUrl}/id`, { observe: 'response' });
    }
}
