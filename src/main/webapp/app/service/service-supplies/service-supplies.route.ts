import { Routes } from '@angular/router';
import { ServiceSuppliesComponent } from './service-supplies.component';
import { UserRouteAccessService } from 'app/core';

export const serviceSuppliesRoute: Routes = [
    {
        path: '',
        component: ServiceSuppliesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
