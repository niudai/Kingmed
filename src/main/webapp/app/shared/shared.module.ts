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
import { HideIfNullDirective } from './pipe/hide-if-null.directive';
@NgModule({
    imports: [
        JhipsterElasticsearchSampleApplicationSharedLibsModule,
        JhipsterElasticsearchSampleApplicationSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        NavigationBackComponent,
        HideIfNullDirective,
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        JhipsterElasticsearchSampleApplicationSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HideIfNullDirective,
        NavigationBackComponent
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
