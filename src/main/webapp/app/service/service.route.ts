import { ServiceComponent } from './service.component';
import { Route, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

export const SERIVCE_ROUTE: Routes = [

    {
        path: 'service',
        component: ServiceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    },

];
