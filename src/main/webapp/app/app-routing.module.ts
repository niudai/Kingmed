import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: () => import('./admin/admin.module').then(m => m.JhipsterElasticsearchSampleApplicationAdminModule)
                },
                {
                    path: 'disease-map',
                    loadChildren: () => import('./disease-map/disease-map.module').then(mod => mod.DiseaseMapModule)
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class JhipsterElasticsearchSampleApplicationAppRoutingModule {}
