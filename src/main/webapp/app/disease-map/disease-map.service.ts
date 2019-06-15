import { IDiseaseBranch, DiseaseBranch } from './../shared/model/disease-branch.model';
import { HttpClient, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DiseaseMapService {

    // url for suppliess
    public diseaseMapUrl = SERVER_API_URL + 'api/disease-map';

    constructor(protected http: HttpClient) { }

    attachDiseaseBranch(diseaseMap: IDiseaseBranch) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-disease-branch`, diseaseMap, { observe: 'body' });
    }

    getAllDiseaseBranch() {
        return this.http.get<DiseaseBranch[]>(`${this.diseaseMapUrl}/get-all-disease-branch`, { observe: 'body'});
    }

}
