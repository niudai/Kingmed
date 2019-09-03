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
import { FeedbackDialogComponent } from 'app/layouts/navbar/feedback-dialog/feedback-dialog.component';
@NgModule({
    imports: [
        JhipsterElasticsearchSampleApplicationSharedCommonModule,
        JhipsterElasticsearchSampleApplicationSharedLibsModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HideIfNullDirective,
        HideIfHasAnyAuthorityDirective,
        FeedbackDialogComponent
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [
        JhiLoginModalComponent,
        FeedbackDialogComponent
    ],
    exports: [
        JhipsterElasticsearchSampleApplicationSharedCommonModule,
        JhipsterElasticsearchSampleApplicationSharedLibsModule,
        JhiLoginModalComponent,
        FeedbackDialogComponent,
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
