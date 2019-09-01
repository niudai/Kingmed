import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [ViewComponent, DeleteComponent],
  imports: [
    CommonModule,
    JhipsterElasticsearchSampleApplicationSharedModule,
    NotificationsRoutingModule
  ],
  entryComponents: [
      DeleteComponent
  ]
})
export class NotificationsModule { }
