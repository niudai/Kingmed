import { RobotMessageComponent } from './robot-message/robot-message.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

export const ROBOT_ROUTE: Routes = [
    {
        path: '',
        component: RobotMessageComponent,
        // data: {
        //     authorities: ['ROLE_USER'],
        //     pageTitle: 'global.menu.robot'
        // },
        // canActivate: [UserRouteAccessService]
    }
];
