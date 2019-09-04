import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './view/feedback.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
    declarations: [FeedbackComponent, DeleteDialogComponent],
    entryComponents: [DeleteDialogComponent],
    imports: [CommonModule, FeedbackRoutingModule, JhipsterElasticsearchSampleApplicationSharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeedbackModule {}
