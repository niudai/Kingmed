import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './index/feedback.component';
import { UserRouteAccessService } from 'app/core';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    // canActivate: [UserRouteAccessService],
    // data: {
    //   authorities: ['ROLE_ADMIN']
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), JhipsterElasticsearchSampleApplicationSharedModule],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {

}
