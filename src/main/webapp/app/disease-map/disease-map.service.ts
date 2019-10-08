import { ILinkCard } from './../shared/model/link-card.model';
import { IDiseaseBranch, DiseaseBranch } from './../shared/model/disease-branch.model';
import { HttpClient, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IFile } from 'app/shared/model/file.model';
import { map } from 'rxjs/operators';
import { DiseaseMap, IDiseaseMap } from 'app/shared/model/disease-map.model';
import { createRequestOption } from 'app/shared';
import { DiseasePartition } from 'app/shared/model/disease-partition.model';

type BranchResponseType = HttpResponse<IDiseaseBranch>;
type BranchResponseArrayType = HttpResponse<IDiseaseBranch[]>;
type MapResponseType = HttpResponse<IDiseaseMap>;
type MapResponseArrayType = HttpResponse<IDiseaseMap[]>;

@Injectable({
    providedIn: 'root'
})
export class DiseaseMapService {

    // url for suppliess
    public diseaseMapUrl = SERVER_API_URL + 'api/disease-map';

    public diseasePartitonUrl = SERVER_API_URL + 'api/disease-partitions';

    constructor(protected http: HttpClient) { }

    attachDiseaseBranch(diseaseBranch: IDiseaseBranch) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-disease-branch`, diseaseBranch, { observe: 'body' });
    }

    getAllDiseaseBranch(req: any): Observable<BranchResponseArrayType> {
        const _params = createRequestOption(req);
        return this.http.get<IDiseaseBranch[]>(`${this.diseaseMapUrl}/get-all-disease-branch`, { params:  _params, observe: 'response'});
    }

    getDiseaseBranch(diseaseBranchId: number): Observable<BranchResponseType> {
        return this.http.get<IDiseaseBranch>(`${this.diseaseMapUrl}/get-disease-branch/${diseaseBranchId}`, { observe: 'response'});
    }

    getDiseaseBranchEagerly(diseaseBranchId: number): Observable<BranchResponseType> {
        return this.http.get<IDiseaseBranch>(`${this.diseaseMapUrl}/get-disease-branch-eagerly/${diseaseBranchId}`, { observe: 'response'});
    }

    getDiseaseMap(diseaseMapId: number): Observable<MapResponseType> {
        return this.http.get<IDiseaseMap>(`${this.diseaseMapUrl}/get-disease-map/${diseaseMapId}`, { observe: 'response'});
    }

    /**
     * Get disease map eagerly with diseases and qarobots
     * @param diseaseMapId
     */
    getDiseaseMapEagerly(diseaseMapId: number): Observable<MapResponseType> {
        return this.http.get<IDiseaseMap>(`${this.diseaseMapUrl}/get-disease-map-eagerly/${diseaseMapId}`, { observe: 'response'});
    }

    /**
     * get child disease maps of disease mp.
     * @param diseaseMapId diseaseMapId
     */
    getDiseaseMaps(diseaseMapId: number): Observable<MapResponseArrayType> {
        return this.http.get<IDiseaseMap[]>(`${this.diseaseMapUrl}/get-disease-maps/${diseaseMapId}`, { observe: 'response' });
    }

    /**
     * Get all children disease map of diseae branch.
     * @param diseaseBranchId
     */
    getAllDiseaseMap(diseaseBranchId: number) {
        return this.http.get<IDiseaseMap[]>(`${this.diseaseMapUrl}/get-all-disease-map/${diseaseBranchId}`, { observe: 'body'});
    }

    addLinkToMap(link: ILinkCard, _map: IDiseaseMap) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-link-card-to-disease-map/${_map.id}`, link);
    }

    deleteLinkToMap(link: ILinkCard, _map: IDiseaseMap) {
        return this.http.post<any>(`${this.diseaseMapUrl}/deattach-link-card-to-disease-map/${_map.id}`, link);
    }

    addLinkToBranch(link: ILinkCard, branch: IDiseaseBranch) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-link-card-to-disease-branch/${branch.id}`, link);
    }

    deleteLinkToBranch(link: ILinkCard, branch: IDiseaseBranch) {
        return this.http.post<any>(`${this.diseaseMapUrl}/deattach-link-card-to-disease-branch/${branch.id}`, link);
    }

    deattachDiseaseBranch(diseaseBranchId: number) {
        return this.http.delete<IDiseaseMap[]>(`${this.diseaseMapUrl}/deattach-disease-branch/${diseaseBranchId}`, { observe: 'body'});
    }

    attachDiseaseMapToDiseaseBranch(diseaseMap: DiseaseMap, diseaseBranchId: number) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-disease-map-to-disease-branch/${diseaseBranchId}`, diseaseMap, {observe: 'body'});
    }

    attachDiseaseMapToDiseaseMap(diseaseMap: DiseaseMap, diseaseMapId: number) {
        return this.http.post<any>(`${this.diseaseMapUrl}/attach-disease-map-to-disease-map/${diseaseMapId}`, diseaseMap, {observe: 'body'});
    }

    associateWithQArobot(diseaseMapId: number, qArobotId: number) {
        return this.http.get<any>(`${this.diseaseMapUrl}/associate-with-q-arobot/${diseaseMapId}/${qArobotId}`, {observe: 'response'});
    }

    associateWithDiseaseXiAn(diseaseMapId: number, diseaseXiAnId: number) {
        return this.http.get<any>(`${this.diseaseMapUrl}/assocaite-with-disease-xi-an/${diseaseMapId}/${diseaseXiAnId}`, {observe: 'response'});
    }

    deassociateWithQArobot(diseaseMapId: number, qArobotId: number) {
        return this.http.get<any>(`${this.diseaseMapUrl}/deassociate-with-q-arobot/${diseaseMapId}/${qArobotId}`, {observe: 'response'});
    }

    deassociateWithDiseaseXiAn(diseaseMapId: number, diseaseXiAnId: number) {
        return this.http.get<any>(`${this.diseaseMapUrl}/deassocaite-with-disease-xi-an/${diseaseMapId}/${diseaseXiAnId}`, {observe: 'response'});
    }

    deleteDiseaseMap(diseaseMapId: number) {
        return this.http.delete<any>(`${this.diseaseMapUrl}/delete-disease-map/${diseaseMapId}`, {observe: 'response'});
    }

    modifyDiseaseMap(diseaseMap: IDiseaseMap) {
        return this.http.put<any>(`${this.diseaseMapUrl}/modify-disease-map`, diseaseMap, { observe: 'response'});
    }

    modifyDiseaseBranch(diseaseBranch: IDiseaseBranch) {
        return this.http.put<any>(`${this.diseaseMapUrl}/modify-disease-branch`, diseaseBranch, {observe: 'response'});
    }

    searchDiseaseBranch(req: any): Observable<BranchResponseArrayType> {
        const _params = createRequestOption(req);
        return this.http.get<IDiseaseBranch[]>(`${this.diseaseMapUrl}/_search-disease-branch`, { params: _params, observe: 'response' });
    }

    searchDiseaseMap(req: any): Observable<MapResponseArrayType> {
        const _params = createRequestOption(req);
        return this.http.get<IDiseaseMap[]>(`${this.diseaseMapUrl}/_search-disease-map`, { params: _params, observe: 'response' });
    }

    // Url for partitions:
    getDiseasePartitions(): Observable<DiseasePartition[]> {
        return this.http.get<DiseasePartition[]>(`${this.diseasePartitonUrl}`, { observe: 'body' });
    }

    getDiseaePartition(partitionId: number): Observable<DiseasePartition> {
        return this.http.get<DiseasePartition>(`${this.diseasePartitonUrl}/${partitionId}`, { observe: 'body' });
    }

    postDiseasePartition(diseasePartition: DiseasePartition): Observable<void> {
        return this.http.post<void>(`${this.diseasePartitonUrl}`, { body: diseasePartition });
    }

    postDiseasePartitionsDiseaseBranch(diseasePartitionId: number, diseaseBranch: DiseaseBranch): Observable<void> {
        return this.http.post<void>(`${this.diseasePartitonUrl}/${diseasePartitionId}/disease-branches`, { body: diseaseBranch });
    }

}
