import { AccountSettingsComponent } from './account-settings.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

export const accountSettingsRoute: Route = {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};
