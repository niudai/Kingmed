import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QArobot } from 'app/shared/model/q-arobot.model';
import { QArobotService } from './q-arobot.service';
import { QArobotComponent } from './q-arobot.component';
import { QArobotDetailComponent } from './q-arobot-detail.component';
import { QArobotUpdateComponent } from './q-arobot-update.component';
import { QArobotDeletePopupComponent } from './q-arobot-delete-dialog.component';
import { IQArobot } from 'app/shared/model/q-arobot.model';

@Injectable({ providedIn: 'root' })
export class QArobotResolve implements Resolve<IQArobot> {
    constructor(private service: QArobotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQArobot> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QArobot>) => response.ok),
                map((qArobot: HttpResponse<QArobot>) => qArobot.body)
            );
        }
        return of(new QArobot());
    }
}

export const qArobotRoute: Routes = [
    {
        path: '',
        component: QArobotComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.qArobot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QArobotDetailComponent,
        resolve: {
            qArobot: QArobotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.qArobot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QArobotUpdateComponent,
        resolve: {
            qArobot: QArobotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.qArobot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QArobotUpdateComponent,
        resolve: {
            qArobot: QArobotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.qArobot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qArobotPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: QArobotDeletePopupComponent,
        resolve: {
            qArobot: QArobotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.qArobot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
