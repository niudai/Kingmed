import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { IndexComponent } from './index/index.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    JhipsterElasticsearchSampleApplicationSharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FeedbackModule { }
