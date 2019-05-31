import { DiseaseXiAnSuppliessDeleteComponent } from './disease-xi-an-suppliess-delete/disease-xi-an-suppliess-delete.component';
import { DiseaseXiAnApplicationsDeleteComponent } from './disease-xi-an-applications-delete/disease-xi-an-applications-delete.component';
import { DiseaseXiAnSuppliessUpdateComponent } from './disease-xi-an-suppliess-update/disease-xi-an-suppliess-update.component';
import { DiseaseXiAnApplicationsUpdateComponent } from './disease-xi-an-applications-update/disease-xi-an-applications-update.component';
import { DiseaseXiAnSuppliessComponent } from './disease-xi-an-suppliess/disease-xi-an-suppliess.component';
import { DiseaseXiAnApplicationsComponent } from './disease-xi-an-applications/disease-xi-an-applications.component';
import { DiseaseXiAnQarobotsUpdateComponent } from './disease-xi-an-qarobots-update/disease-xi-an-qarobots-update.component';
import { DiseaseXiAnQarobotsDeleteComponent } from './disease-xi-an-qarobots-delete/disease-xi-an-qarobots-delete.component';
import { QArobot } from 'app/shared/model/q-arobot.model';
import { IQArobot } from './../../shared/model/q-arobot.model';

import { DiseaseXiAnPricesDeleteComponent } from './disease-xi-an-prices-delete/disease-xi-an-prices-delete.component';
import { PriceXiAn } from './../../shared/model/price-xi-an.model';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService, User } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { DiseaseXiAnComponent } from './disease-xi-an.component';
import { DiseaseXiAnDetailComponent } from './disease-xi-an-detail.component';
import { DiseaseXiAnUpdateComponent } from './disease-xi-an-update.component';
import { DiseaseXiAnDeletePopupComponent } from './disease-xi-an-delete-dialog.component';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { IPriceXiAn } from 'app/shared/model/price-xi-an.model';
import { DiseaseXiAnPricesComponent } from './disease-xi-an-prices/disease-xi-an-prices.component';
import { DiseaseXiAnPricesUpdateComponent } from './disease-xi-an-prices-update/disease-xi-an-prices-update.component';
import { DiseaseXiAnQarobotsComponent } from './disease-xi-an-qarobots/disease-xi-an-qarobots.component';
@Injectable({ providedIn: 'root' })
export class DiseaseXiAnResolve implements Resolve<IDiseaseXiAn> {
    constructor(private service: DiseaseXiAnService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiseaseXiAn> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DiseaseXiAn>) => response.ok),
                map((diseaseXiAn: HttpResponse<DiseaseXiAn>) => diseaseXiAn.body)
            );
        }
        return of(new DiseaseXiAn());
    }
}

@Injectable({ providedIn: 'root' })
export class QArobotResolve implements Resolve<IQArobot[]> {
    constructor(private service: DiseaseXiAnService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQArobot[]> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.getQArobot(id).pipe(
                filter((response: HttpResponse<IQArobot[]>) => response.ok),
                map((qarobots: HttpResponse<IQArobot[]>) => qarobots.body)
            );
        }
        return of([ new QArobot() ]);
    }
}

@Injectable({ providedIn: 'root' })
export class PriceResolve implements Resolve<IDiseaseXiAn> {
    constructor(private service: DiseaseXiAnService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiseaseXiAn> {
        const id = route.params['priceId'] ? route.params['priceId'] : null;
        if (id) {
            return this.service.getPrice(id).pipe(
                filter((response: HttpResponse<IPriceXiAn>) => response.ok),
                map((price: HttpResponse<PriceXiAn>) => price.body)
            );
        }
        return of(new PriceXiAn());
    }
}

export const diseaseXiAnRoute: Routes = [
    {
        path: '',
        component: DiseaseXiAnComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DiseaseXiAnDetailComponent,
        resolve: {
            diseaseXiAn: DiseaseXiAnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/prices',
        component: DiseaseXiAnPricesComponent,
        children: [
            {
                path: ':priceId/delete',
                component: DiseaseXiAnPricesDeleteComponent,
                canActivate: [UserRouteAccessService],
                outlet: 'pricePopup'
            }
        ],
        resolve: {
            diseaseXiAn: DiseaseXiAnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/qarobots',
        component: DiseaseXiAnQarobotsComponent,
        resolve: {
            qarobots: QArobotResolve
        },
        // resolve: {
        //     diseaseXiAn: DiseaseXiAnResolve
        // },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/applications',
        component: DiseaseXiAnApplicationsComponent,
        resolve: {
            qarobots: QArobotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/suppliess',
        component: DiseaseXiAnSuppliessComponent,
        resolve: {
            qarobots: QArobotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DiseaseXiAnUpdateComponent,
        resolve: {
            diseaseXiAn: DiseaseXiAnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'newPrice/:id',
        component: DiseaseXiAnPricesUpdateComponent,
        resolve: {
            price: PriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'newQArobot/:diseaseId',
        component: DiseaseXiAnQarobotsUpdateComponent,
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'newApplication/:diseaseId',
        component: DiseaseXiAnApplicationsUpdateComponent,
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'newSupplies/:diseaseId',
        component: DiseaseXiAnSuppliessUpdateComponent,
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'deletePrice/:priceId',
        component: DiseaseXiAnPricesDeleteComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'deleteQArobot/:diseaseId/:qarobotId',
        component: DiseaseXiAnQarobotsDeleteComponent,
        canActivate: [UserRouteAccessService]

    },
    {
        path: 'deleteApplication/:diseaseId/:applicationId',
        component: DiseaseXiAnApplicationsDeleteComponent,
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'deleteSupplies/:diseaseId/:suppliesId',
        component: DiseaseXiAnSuppliessDeleteComponent,
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'updatePrice/:priceId',
        component: DiseaseXiAnPricesUpdateComponent,
        resolve: {
            price: PriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DiseaseXiAnUpdateComponent,
        resolve: {
            diseaseXiAn: DiseaseXiAnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diseaseXiAnPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DiseaseXiAnDeletePopupComponent,
        resolve: {
            diseaseXiAn: DiseaseXiAnResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
