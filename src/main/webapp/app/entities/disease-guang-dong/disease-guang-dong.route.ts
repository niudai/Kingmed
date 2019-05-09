import { DiseaseGuangDongPricesDeletePopupComponent, DiseaseGuangDongPricesDeleteComponent } from './disease-guang-dong-prices-delete/disease-guang-dong-prices-delete.component';
import { Price, IPrice } from './../../shared/model/price.model';
import { DiseaseGuangDongPricesComponent } from './disease-guang-dong-prices/disease-guang-dong-prices.component';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';
import { DiseaseGuangDongService } from './disease-guang-dong.service';
import { DiseaseGuangDongComponent } from './disease-guang-dong.component';
import { DiseaseGuangDongDetailComponent } from './disease-guang-dong-detail.component';
import { DiseaseGuangDongUpdateComponent } from './disease-guang-dong-update.component';
import { DiseaseGuangDongDeletePopupComponent } from './disease-guang-dong-delete-dialog.component';
import { IDiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';
import { DiseaseGuangDongPricesUpdateComponent } from './disease-guang-dong-prices-update/disease-guang-dong-prices-update.component';

@Injectable({ providedIn: 'root' })
export class DiseaseGuangDongResolve implements Resolve<IDiseaseGuangDong> {
    constructor(private service: DiseaseGuangDongService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiseaseGuangDong> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DiseaseGuangDong>) => response.ok),
                map((diseaseGuangDong: HttpResponse<DiseaseGuangDong>) => diseaseGuangDong.body)
            );
        }
        return of(new DiseaseGuangDong());
    }
}

@Injectable({ providedIn: 'root' })
export class PriceResolve implements Resolve<IDiseaseGuangDong> {
    constructor(private service: DiseaseGuangDongService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiseaseGuangDong> {
        const id = route.params['priceId'] ? route.params['priceId'] : null;
        if (id) {
            return this.service.getPrice(id).pipe(
                filter((response: HttpResponse<IPrice>) => response.ok),
                map((price: HttpResponse<Price>) => price.body)
            );
        }
        return of(new Price());
    }
}

export const diseaseGuangDongRoute: Routes = [
    {
        path: '',
        component: DiseaseGuangDongComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DiseaseGuangDongDetailComponent,
        resolve: {
            diseaseGuangDong: DiseaseGuangDongResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/prices',
        component: DiseaseGuangDongPricesComponent,
        children: [
            {
                path: ':priceId/delete',
                component: DiseaseGuangDongPricesDeleteComponent,
                canActivate: [UserRouteAccessService],
                outlet: 'pricePopup'
            }
        ],
        resolve: {
            diseaseGuangDong: DiseaseGuangDongResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DiseaseGuangDongUpdateComponent,
        resolve: {
            diseaseGuangDong: DiseaseGuangDongResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'newPrice/:id',
        component: DiseaseGuangDongPricesUpdateComponent,
        resolve: {
            price: PriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'updatePrice/:priceId',
        component: DiseaseGuangDongPricesUpdateComponent,
        resolve: {
            price: PriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'deletePrice/:priceId',
        component: DiseaseGuangDongPricesDeleteComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/edit',
        component: DiseaseGuangDongUpdateComponent,
        resolve: {
            diseaseGuangDong: DiseaseGuangDongResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diseaseGuangDongPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DiseaseGuangDongDeletePopupComponent,
        resolve: {
            diseaseGuangDong: DiseaseGuangDongResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseGuangDong.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
