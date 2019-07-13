import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { IRobotMessage } from './../shared/model/robot-message.model';
import { Injectable } from '@angular/core';
import { createRequestOption } from 'app/shared';
import { WXROBOT_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class RobotService {


    constructor(protected http: HttpClient) {

    }

    postMessage(body: IRobotMessage, para?: any) {
        const _headers = new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded'
        });
        const option = createRequestOption(para);
        return this.http.post<any>(WXROBOT_URL, body, { headers: _headers,  params: option, observe: 'response'});
    }
}
