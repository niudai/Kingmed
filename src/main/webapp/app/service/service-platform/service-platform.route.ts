import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ServicePlatformComponent } from './service-platform.component';

export const servicePlatformRoute: Routes = [
    {
        path: '',
        component: ServicePlatformComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'service.platform'
        },
        canActivate: [UserRouteAccessService]
    }
];
