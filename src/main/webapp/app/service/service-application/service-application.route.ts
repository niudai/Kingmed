import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ServiceApplicationComponent } from './service-application.component';

export const serviceApplictionRoute: Routes = [
    {
        path: '',
        component: ServiceApplicationComponent,
        data: {
            authorities: ['ROLE_USER'],
            // pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
