import { DiseaseMapComponent } from './disease-map/disease-map.component';
import { DiseaseBranchComponent } from './disease-branch/disease-branch.component';
import { Route, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

export const SERIVCE_ROUTE: Routes = [

    {
        path: '',
        component: DiseaseBranchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'disease-map/:id',
        component: DiseaseMapComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    }

];
