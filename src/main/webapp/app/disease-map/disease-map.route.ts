import { DiseaseBranchComponent } from './disease-branch/disease-branch.component';
import { Route, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

export const SERIVCE_ROUTE: Routes = [

    {
        path: 'disease-branch',
        component: DiseaseBranchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'disease-map/:id',
        component: DiseaseMa,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'disease-branch',
        component: DiseaseBranchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },

];
