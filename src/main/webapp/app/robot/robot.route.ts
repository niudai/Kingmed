import { RobotMessageComponent } from './robot-message/robot-message.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { RobotUpdateComponent } from './robot-update/robot-update.component';

export const ROBOT_ROUTE: Routes = [
    {
        path: '',
        component: RobotMessageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.robot'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/update',
        component: RobotUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.robot'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'create',
        component: RobotUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.robot'
        },
        canActivate: [UserRouteAccessService]
    }
];
