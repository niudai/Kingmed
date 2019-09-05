import { Routes } from '@angular/router';

import { auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, metricsRoute, userMgmtRoute } from './';

import { UserRouteAccessService } from 'app/core';
import { subsidiaryRoute } from './subsidiary-admin/subsidiary-admin.route';

const ADMIN_ROUTES = [auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, ...userMgmtRoute, metricsRoute, ...subsidiaryRoute];

export const adminState: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService],
        children: ADMIN_ROUTES
    }
];
