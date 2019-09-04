import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './index/feedback.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    JhipsterElasticsearchSampleApplicationSharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FeedbackModule { }
