import { NgModule } from '@angular/core';

import {
    JhipsterElasticsearchSampleApplicationSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';
import { TrimPipe } from './pipe/trim.pipe';
import { SafePipe } from './pipe/safe.pipe';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TrimPipe, SafePipe],
    exports: [JhipsterElasticsearchSampleApplicationSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent
        , TrimPipe, SafePipe]
})
export class JhipsterElasticsearchSampleApplicationSharedCommonModule {}
