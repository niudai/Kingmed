import { SERIVCE_ROUTE } from './service.route';
import { ServiceComponent } from './service.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [RouterModule.forChild([SERIVCE_ROUTE])],
    declarations: [ServiceComponent]
})
export class JhipsterElasticsearchSampleApplicationServiceModule {}
