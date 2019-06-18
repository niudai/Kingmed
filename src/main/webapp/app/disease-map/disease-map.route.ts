import { DiseaseBranchCreateComponent } from './disease-branch-create/disease-branch-create.component';
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
        path: 'attach-disease-branch',
        component: DiseaseBranchCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'view-disease-map/:diseaseBranchId',
        component: DiseaseMapComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    }

];