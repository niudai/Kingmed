import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { HomeComponent } from './home';

const LAYOUT_ROUTES = [...navbarRoute];

const ERROR_ROUTES = [...errorRoute];

const HOME_ROUTE = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'global.title'
        }
    }
];

const LAZY_ROUTE = [
    {
        path: 'account',
        loadChildren: './account/account.module#JhipsterElasticsearchSampleApplicationAccountModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...HOME_ROUTE,
                ...LAZY_ROUTE,
                ...LAYOUT_ROUTES,
                ...ERROR_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class JhipsterElasticsearchSampleApplicationAppRoutingModule {}
