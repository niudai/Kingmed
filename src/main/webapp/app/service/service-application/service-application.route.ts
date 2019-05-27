import { ServiceApplicationViewComponent } from './service-application-view/service-application-view.component';
import { ServiceApplicationUpdateComponent } from './service-application-name/service-application-update.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ServiceApplicationComponent } from './service-application.component';
import { ServiceApplicationDeleteComponent } from './service-application-delete/service-application-delete.component';
import { ServiceApplicationCreateComponent } from './service-application-create/service-application-create.component';

export const serviceApplictionRoute: Routes = [
    {
        path: '',
        component: ServiceApplicationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.application'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'update/:id',
        component: ServiceApplicationUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.application'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delete/:id',
        component: ServiceApplicationDeleteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.application'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'create',
        component: ServiceApplicationCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.application'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'view/:id',
        component: ServiceApplicationViewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.application'
        },
        canActivate: [UserRouteAccessService]
    }
];
