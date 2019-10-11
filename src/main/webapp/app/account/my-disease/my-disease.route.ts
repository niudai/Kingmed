import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { Routes, Route } from '@angular/router';
import { MyDiseaseComponent } from './my-disease/my-disease.component';
import { MyDiseaseCreateComponent } from './my-disease-create/my-disease-create.component';
import { MyMapComponent } from '../my-map/my-map.component';
import { MainComponent } from '../main/main.component';

export const myDiseaseRoute: Route[] = [
    {
        path: '',
        component: MainComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.my-disease'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'create',
        component: MyDiseaseCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.my-disease'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'disease',
        component: MyDiseaseComponent,
        outlet: 'subpage',
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.my-disease'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'map',
        component: MyMapComponent,
        outlet: 'subpage',
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.my-disease'
        },
        canActivate: [UserRouteAccessService]
    },
];
