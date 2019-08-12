import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { Routes, Route } from '@angular/router';
import { MyDiseaseComponent } from './my-disease/my-disease.component';
import { MyDiseaseCreateComponent } from './my-disease-create/my-disease-create.component';

export const myDiseaseRoute: Route[] = [
    {
        path: 'my-disease',
        component: MyDiseaseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.my-disease'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'my-disease/create',
        component: MyDiseaseCreateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.my-disease'
        },
        canActivate: [UserRouteAccessService]
    }
];
