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
