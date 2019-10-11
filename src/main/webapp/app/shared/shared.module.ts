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
import { DiseaseXiAnDetailBottomSheetComponent } from 'app/entities/disease-xi-an/disease-xi-an-detail-bottom-sheet/disease-xi-an-detail-bottom-sheet.component';
import { DiseaseXiAnGiveDialogComponent } from 'app/entities/disease-xi-an/disease-xi-an-give-dialog/disease-xi-an-give-dialog.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [
        JhipsterElasticsearchSampleApplicationSharedCommonModule,
        JhipsterElasticsearchSampleApplicationSharedLibsModule,
        RouterModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        HideIfNullDirective,
        HideIfHasAnyAuthorityDirective,
        FeedbackDialogComponent,
        DiseaseXiAnDetailBottomSheetComponent,
        DiseaseXiAnGiveDialogComponent
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
        HideIfHasAnyAuthorityDirective,
        DiseaseXiAnDetailBottomSheetComponent,
        DiseaseXiAnGiveDialogComponent
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
