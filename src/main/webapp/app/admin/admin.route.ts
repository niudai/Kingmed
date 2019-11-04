import { Routes } from '@angular/router';

import { auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, metricsRoute, userMgmtRoute } from './';

import { UserRouteAccessService } from 'app/core';
import { subsidiaryRoute } from './subsidiary-admin/subsidiary-admin.route';
import { concourseRoute } from './concourse-admin/concourse-admin.route';
import { helpLinkRoute } from './help-link/help-link.route';

const ADMIN_ROUTES = [
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    helpLinkRoute,
    {
        path: 'user-management',
        loadChildren: './user-management/user-management.module#JhipsterElasticsearchSampleApplicationUserManagementModule'
    },
    metricsRoute,
    subsidiaryRoute,
    concourseRoute
];

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
