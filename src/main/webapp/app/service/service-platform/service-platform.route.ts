import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ServicePlatformComponent } from './service-platform.component';
import { ServicePlatformDeleteComponent } from './service-platform-delete/service-platform-delete.component';
import { ServicePlatformCreateComponent } from './service-platform-create/service-platform-create.component';
import { ServicePlatformUpdateComponent } from './service-application-update/service-platform-update.component';

export const servicePlatformRoute: Routes = [
    {
        path: '',
        component: ServicePlatformComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.platform'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'update/:id',
        component: ServicePlatformUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.platform'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delete/:id',
        component: ServicePlatformDeleteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.platform'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'create',
        component: ServicePlatformCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.platform'
        },
        canActivate: [UserRouteAccessService]
    }
];
