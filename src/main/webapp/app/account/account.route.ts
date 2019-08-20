import { Routes } from '@angular/router';

import { activateRoute, passwordRoute, passwordResetFinishRoute, passwordResetInitRoute, registerRoute, settingsRoute } from './';
import { myDiseaseRoute } from './my-disease/my-disease.route';
import { accountSettingsRoute } from './account-settings/account-settings.route';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute,
    accountSettingsRoute
];

export const accountState: Routes = [
    ...ACCOUNT_ROUTES, ...myDiseaseRoute
];
