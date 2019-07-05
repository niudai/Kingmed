import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { JhipsterElasticsearchSampleApplicationCoreModule } from 'app/core';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule
        , RouterModule.forChild([HOME_ROUTE])],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationHomeModule {}
