import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import {
    QArobotComponent,
    QArobotDetailComponent,
    QArobotUpdateComponent,
    QArobotDeletePopupComponent,
    QArobotDeleteDialogComponent,
    qArobotRoute,
    qArobotPopupRoute
} from './';
import { QArobotDiseaseComponent } from './q-arobot-disease/q-arobot-disease.component';

const ENTITY_STATES = [...qArobotRoute, ...qArobotPopupRoute];

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QArobotComponent,
        QArobotDetailComponent,
        QArobotUpdateComponent,
        QArobotDeleteDialogComponent,
        QArobotDeletePopupComponent,
        QArobotDiseaseComponent
    ],
    entryComponents: [QArobotComponent, QArobotUpdateComponent, QArobotDeleteDialogComponent, QArobotDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationQArobotModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
