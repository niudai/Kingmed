import { IRobot } from './../shared/model/robot.model';
import { HttpParams, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { IRobotMessage } from './../shared/model/robot-message.model';
import { Injectable } from '@angular/core';
import { createRequestOption } from 'app/shared';
import { WXROBOT_URL, SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

type KinResponseEntity = HttpResponse<IRobot>;
type KinResponseArrayEntity = HttpResponse<IRobot[]>;
@Injectable({
    providedIn: 'root'
})
export class RobotService {

    public resourceUrl = SERVER_API_URL + 'api/robots'; // localhost/api/labels/1

    constructor(protected http: HttpClient) {

    }

    postMessage(body: IRobotMessage, url: string) {
        const _headers = new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded'
        });
        // const option = createRequestOption(para);
        return this.http.post<any>(url, body, { headers: _headers, observe: 'response'});
    }

    create(label: IRobot): Observable<KinResponseEntity> {
        return this.http.post<IRobot>(this.resourceUrl, label, { observe: 'response' });
    }

    update(label: IRobot): Observable<KinResponseEntity> {
        return this.http.put<IRobot>(this.resourceUrl, label, { observe: 'response' });
    }

    find(id: number): Observable<KinResponseEntity> {
        return this.http.get<IRobot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<KinResponseArrayEntity> {
        const options = createRequestOption(req);
        return this.http.get<IRobot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

}
