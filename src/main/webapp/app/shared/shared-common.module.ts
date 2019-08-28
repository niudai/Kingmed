import { NgModule } from '@angular/core';

import {
    JhipsterElasticsearchSampleApplicationSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';
import { TrimPipe } from './pipe/trim.pipe';
import { SafePipe } from './pipe/safe.pipe';
import { TrimIfTooLongPipe } from './pipe/trim-if-too-long.pipe';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TrimPipe, SafePipe, TrimIfTooLongPipe],
    exports: [JhipsterElasticsearchSampleApplicationSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent
        , TrimPipe, SafePipe, TrimIfTooLongPipe]
})
export class JhipsterElasticsearchSampleApplicationSharedCommonModule {}
