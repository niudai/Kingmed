import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    JhipsterElasticsearchSampleApplicationSharedModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
