import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { SERIVCE_ROUTE } from './service.route';
import { ServiceComponent } from './service.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule,
        RouterModule.forChild([SERIVCE_ROUTE]),
        AngularFileUploaderModule,
        ReactiveFormsModule],
    declarations: [ServiceComponent]
})
export class JhipsterElasticsearchSampleApplicationServiceModule {}
