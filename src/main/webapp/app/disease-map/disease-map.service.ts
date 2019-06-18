import { IDiseaseBranch, DiseaseBranch } from './../shared/model/disease-branch.model';
import { HttpClient, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';
import { map } from 'rxjs/operators';
import { DiseaseMap } from 'app/shared/model/disease-map.model';

@Injectable({
    providedIn: 'root'
})
export class DiseaseMapService {

    // url for suppliess
    public diseaseMapUrl = SERVER_API_URL + 'api/disease-map';

    constructor(protected http: HttpClient) { }

    attachDiseaseBranch(diseaseBranch: IDiseaseBranch) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-disease-branch`, diseaseBranch, { observe: 'body' });
    }

    getAllDiseaseBranch() {
        return this.http.get<DiseaseBranch[]>(`${this.diseaseMapUrl}/get-all-disease-branch`, { observe: 'body'});
    }

    getDiseaseBranch(diseaseBranchId: number) {
        return this.http.get<DiseaseBranch>(`${this.diseaseMapUrl}/get-disease-branch/${diseaseBranchId}`, { observe: 'body'});
    }

    getAllDiseaseMap(diseaseBranchId: number) {
        return this.http.get<DiseaseMap[]>(`${this.diseaseMapUrl}/get-all-disease-map/${diseaseBranchId}`, { observe: 'body'});
    }

    deattachDiseaseBranch(diseaseBranchId: number) {
        return this.http.delete<DiseaseMap[]>(`${this.diseaseMapUrl}/deattach-disease-branch/${diseaseBranchId}`, { observe: 'body'});
    }

    attachDiseaseMapToDiseaseBranch(diseaseMap: DiseaseMap, diseaseBranchId: number) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-disease-map-to-disease-branch/${diseaseBranchId}`, diseaseMap, {observe: 'body'});
    }

}