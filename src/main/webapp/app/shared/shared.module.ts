import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    JhipsterElasticsearchSampleApplicationSharedLibsModule,
    JhipsterElasticsearchSampleApplicationSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from './';
import { HideIfNullDirective } from './pipe/hide-if-null.directive';
import { HideIfHasAnyAuthorityDirective } from './pipe/hide-if-has-any-authority.directive';
@NgModule({
    imports: [
        JhipsterElasticsearchSampleApplicationSharedCommonModule,
        JhipsterElasticsearchSampleApplicationSharedLibsModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HideIfNullDirective,
        HideIfHasAnyAuthorityDirective
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        JhipsterElasticsearchSampleApplicationSharedCommonModule,
        JhipsterElasticsearchSampleApplicationSharedLibsModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HideIfNullDirective,
        HideIfHasAnyAuthorityDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationSharedModule {
    static forRoot() {
        return {
            ngModule: JhipsterElasticsearchSampleApplicationSharedModule
        };
    }
}
