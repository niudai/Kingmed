import { DiseaseGuangDongComponent } from './../entities/disease-guang-dong/disease-guang-dong.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { SERIVCE_ROUTE } from './service.route';
import { ServiceComponent } from './service.component';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceApplicationComponent } from './service-application/service-application.component';
import { ServiceSuppliesComponent } from './service-supplies/service-supplies.component';
import { ServicePlatformComponent } from './service-platform/service-platform.component';
import { UserRouteAccessService } from 'app/core';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule,
        RouterModule.forChild([
            {
                path: 'service-supplies',
                loadChildren: () => import('./service-supplies/service-supplies.module').then(m => m.ServiceSuppliesModule)
            },
            {
                path: 'service-platform',
                loadChildren: () => import('./service-platform/service-platform.module').then(m => m.ServicePlatformModule)
            },
            {
                path: 'service-application',
                loadChildren: () => import('./service-application/service-application.module').then(m => m.ServiceApplicationModule)
            },
            {
                path: 'service',
                component: ServiceComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jhipsterElasticsearchSampleApplicationApp.diseaseXiAn.home.title'
                },
                canActivate: [UserRouteAccessService]
            }
        ]), ReactiveFormsModule],
        declarations: [ServiceComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    // declarations: [ServiceComponent, ServiceApplicationComponent, ServiceSuppliesComponent, ServicePlatformComponent]
})
export class JhipsterElasticsearchSampleApplicationServiceModule {}
