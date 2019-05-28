import { ServiceSuppliesViewComponent } from './service-supplies-view/service-supplies-view.component';
import { ServiceSuppliesUpdateComponent } from './service-supplies-update/service-supplies-update.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ServiceSuppliesComponent } from './service-supplies.component';
import { ServiceSuppliesDeleteComponent } from './service-supplies-delete/service-supplies-delete.component';
import { ServiceSuppliesCreateComponent } from './service-supplies-create/service-supplies-create.component';

export const serviceSuppliesRoute: Routes = [
    {
        path: '',
        component: ServiceSuppliesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.supplies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'update/:id',
        component: ServiceSuppliesUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.supplies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delete/:id',
        component: ServiceSuppliesDeleteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.supplies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'create',
        component: ServiceSuppliesCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.supplies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'view/:id',
        component: ServiceSuppliesViewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.supplies'
        },
        canActivate: [UserRouteAccessService]
    }
];
