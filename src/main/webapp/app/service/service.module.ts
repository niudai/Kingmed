import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { SERIVCE_ROUTE } from './service.route';
import { ServiceComponent } from './service.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule,
        RouterModule.forChild([SERIVCE_ROUTE]),
        AngularFileUploaderModule],
    declarations: [ServiceComponent]
})
export class JhipsterElasticsearchSampleApplicationServiceModule {}
