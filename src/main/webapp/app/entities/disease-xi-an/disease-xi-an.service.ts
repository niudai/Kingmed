import { ISubsidiary } from './../../shared/model/subsidiary.model';
import { Account } from 'app/core/user/account.model';
import { IQArobot } from './../../shared/model/q-arobot.model';
import { QArobot } from 'app/shared/model/q-arobot.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { IPriceXiAn } from 'app/shared/model/price-xi-an.model';
import { IFile } from 'app/shared/model/file.model';
import { LinkCard } from 'app/shared/model/link-card.model';
import { IComment } from 'app/shared/model/comment.model';

type EntityResponseType = HttpResponse<IDiseaseXiAn>;
type EntityArrayResponseType = HttpResponse<IDiseaseXiAn[]>;

type PriceResponseType = HttpResponse<IPriceXiAn>;
type PriceArrayResponseType = HttpResponse<IPriceXiAn[]>;

type CommentResponse = HttpResponse<IComment>;
type CommentArrayResponse = HttpResponse<IComment[]>;

@Injectable({ providedIn: 'root' })
export class DiseaseXiAnService {
    public resourceUrl = SERVER_API_URL + 'api/disease-xi-ans';
    public subsidiaryUrl = SERVER_API_URL + 'api/subsidiaries';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/disease-xi-ans';

    constructor(protected http: HttpClient) {}

    getAllSubsidiary() {
        return this.http.get<ISubsidiary[]>(this.subsidiaryUrl);
    }

    create(req: any, diseaseXiAn: IDiseaseXiAn): Observable<EntityResponseType> {
        const options = createRequestOption(req);
        return this.http.post<IDiseaseXiAn>(this.resourceUrl, diseaseXiAn, { params: options, observe: 'response' });
    }

    update(req: any, diseaseXiAn: IDiseaseXiAn): Observable<EntityResponseType> {
        const param: HttpParams = createRequestOption(req);
        return this.http.put<IDiseaseXiAn>(this.resourceUrl, diseaseXiAn, { params: param, observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiseaseXiAn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    activate(id: number, activated: boolean): Observable<EntityResponseType> {
        return this.http.put<any>(`${this.resourceUrl}/activate/${id}/${activated}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiseaseXiAn[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    addNewPrice(id: number, price: IPriceXiAn): Observable<PriceResponseType> {
        return this.http.post<IPriceXiAn>(`${this.resourceUrl}/addPrice/${id}`, price, { observe: 'response' });
    }

    deletePrice(id: number): Observable<EntityResponseType> {
        return this.http.delete<any>(`${this.resourceUrl}/deletePrice/${id}`);
    }

    updatePrice(price: IPriceXiAn): Observable<PriceResponseType> {
        return this.http.put<IPriceXiAn>(`${this.resourceUrl}/updatePrice`, price, { observe: 'response' });
    }

    getPrice(id: number): Observable<PriceResponseType> {
        return this.http.get<IPriceXiAn>(`${this.resourceUrl}/getPrice/${id}`, { observe: 'response' });
    }

    delete(req: any, id: number): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { params: options, observe: 'response' });
    }

    ////////////// Disease Xi An //////////////////////

    getDiseases(id: number): Observable<HttpResponse<IQArobot[]>> {
        return this.http.get<IDiseaseXiAn[]>(`${this.resourceUrl}/diseases-of-disease/${id}`, { observe: 'response' });
    }

    associateWithDisease(ownId: number, reversedId: number) {
        return this.http.get<any>(`${this.resourceUrl}/associate-with-disease/${ownId}/${reversedId}`, { observe: 'response' });
    }

    deassociateWithDisease(ownId: number, reversedId: number) {
        if (ownId !== reversedId) {
            return this.http.get<any>(`${this.resourceUrl}/deassociate-with-disease/${ownId}/${reversedId}`, { observe: 'response' });
        }
    }

    ////////////// QArobot ////////////////////////

    getQArobot(id: number): Observable<HttpResponse<IQArobot[]>> {
        return this.http.get<IFile[]>(`${this.resourceUrl}/getQArobotsOfDisease/${id}`, { observe: 'response' });
    }

    associate(diseaseId: number, qarobotId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/associate/${diseaseId}/${qarobotId}`);
    }

    deassociate(diseaseId: number, qarobotId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/deassociate/${diseaseId}/${qarobotId}`);
    }

    /////////////// Application ///////////////////////

    getApplications(id: number): Observable<HttpResponse<IFile[]>> {
        return this.http.get<IFile[]>(`${this.resourceUrl}/getApplicationsOfDisease/${id}`, { observe: 'response' });
    }

    associateWithApplication(diseaseId: number, applicationId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/associateWithApplication/${diseaseId}/${applicationId}`);
    }

    deassociateWithApplication(diseaseId: number, applicationId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/deassociateWithApplication/${diseaseId}/${applicationId}`);
    }

    ///////////////// Supplies ////////////////////////////

    getSuppliess(id: number): Observable<HttpResponse<IFile[]>> {
        return this.http.get<IFile[]>(`${this.resourceUrl}/getSuppliessOfDisease/${id}`, { observe: 'response' });
    }

    associateWithSupplies(diseaseId: number, suppliesId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/associateWithSupplies/${diseaseId}/${suppliesId}`);
    }

    deassociateWithSupplies(diseaseId: number, suppliesId: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/deassociateWithSupplies/${diseaseId}/${suppliesId}`);
    }

    ////////////////// Article //////////////////////////////

    deleteArticle(link: LinkCard, id: number) {
        return this.http.post<any>(`${this.resourceUrl}/deattach-link-card/${id}`, link);
    }

    addArticle(link: LinkCard, id: number) {
        return this.http.post<any>(`${this.resourceUrl}/attach-link-card/${id}`, link);
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiseaseXiAn[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    /////////////////////////// Users ////////////////////////////

    getUsers(diseaseId: number) {
        return this.http.get<Account[]>(`${this.resourceUrl}/${diseaseId}/users`, { observe: 'response' });
    }

    //////////////////////////////// Comments /////////////////////
    createComment(diseaseId: number, comment: IComment): Observable<CommentResponse> {
        return this.http.post<IComment>(`this.resourceUrl/${diseaseId}/comments`, comment, { observe: 'response' });
    }
    updateComment(diseaseId: number, comment: IComment): Observable<CommentResponse> {
        return this.http.put<IComment>(`this.resourceUrl/${diseaseId}/comments`, comment, { observe: 'response' });
    }
    queryComment(diseaseId: number): Observable<CommentArrayResponse> {
        return this.http.get<IComment[]>(`this.resourceUrl/${diseaseId}/comments`, { observe: 'response' });
    }
    deleteComment(diseaseId: number, commentId: number): Observable<CommentResponse> {
        return this.http.delete<any>(`this.resourceUrl/${diseaseId}/comments/${commentId}`, { observe: 'response' });
    }
}
