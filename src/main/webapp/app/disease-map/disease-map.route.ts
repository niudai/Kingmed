import { DiseaseBranchCreateComponent } from './disease-branch-create/disease-branch-create.component';
import { DiseaseMapComponent } from './disease-map/disease-map.component';
import { DiseaseBranchComponent } from './disease-branch/disease-branch.component';
import { Route, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { DiseasePartitionComponent } from './disease-partition/disease-partition.component';
import { DiseasePartitionCreateComponent } from './disease-partition-create/disease-partition-create.component';

export const SERIVCE_ROUTE: Routes = [
    {
        path: ':id/disease-branches',
        component: DiseaseBranchComponent,
        data: {
            authorities: [],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: '',
        component: DiseasePartitionComponent,
        data: {
            authorities: [],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'disease-partitions/create',
        component: DiseasePartitionCreateComponent,
        data: {
            authorities: [],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/update',
        component: DiseasePartitionCreateComponent,
        data: {
            authorities: [],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: ':id/disease-branches/create',
        component: DiseaseBranchCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/disease-branches/:diseaseBranchId/edit',
        component: DiseaseBranchCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/disease-branches/:diseaseBranchId/view',
        component: DiseaseMapComponent,
        data: {
            authorities: [],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/disease-maps/:diseaseMapId/view',
        component: DiseaseMapComponent,
        data: {
            authorities: [],
            pageTitle: 'global.menu.entities.diseaseMap'
        },
        canActivate: [UserRouteAccessService]
    }
];
