import { UserRouteAccessService } from './../../../core/auth/user-route-access-service';
import { Routes } from '@angular/router';
import { MyDiseaseComponent } from './my-disease.component';

export const myDiseaseRoute: Routes = [
    {
        path: 'my-disease',
        component: MyDiseaseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.my-disease'
        },
        canActivate: [UserRouteAccessService]
    }
]
