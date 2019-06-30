import { NgModule } from '@angular/core';

import {
    JhipsterElasticsearchSampleApplicationSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';
import { TrimPipe } from './pipe/trim.pipe';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TrimPipe],
    exports: [JhipsterElasticsearchSampleApplicationSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent
        , TrimPipe]
})
export class JhipsterElasticsearchSampleApplicationSharedCommonModule {}
