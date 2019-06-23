import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    JhipsterElasticsearchSampleApplicationSharedLibsModule,
    JhipsterElasticsearchSampleApplicationSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from './';
import { NavigationBackComponent } from './navigation/navigation-back.component';
@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedLibsModule, JhipsterElasticsearchSampleApplicationSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, NavigationBackComponent],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [JhipsterElasticsearchSampleApplicationSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, NavigationBackComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationSharedModule {
    static forRoot() {
        return {
            ngModule: JhipsterElasticsearchSampleApplicationSharedModule
        };
    }
}
