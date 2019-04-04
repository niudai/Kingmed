import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import {
    DiseaseGuangDongComponent,
    DiseaseGuangDongDetailComponent,
    DiseaseGuangDongUpdateComponent,
    DiseaseGuangDongDeletePopupComponent,
    DiseaseGuangDongDeleteDialogComponent,
    diseaseGuangDongRoute,
    diseaseGuangDongPopupRoute
} from './';

const ENTITY_STATES = [...diseaseGuangDongRoute, ...diseaseGuangDongPopupRoute];

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiseaseGuangDongComponent,
        DiseaseGuangDongDetailComponent,
        DiseaseGuangDongUpdateComponent,
        DiseaseGuangDongDeleteDialogComponent,
        DiseaseGuangDongDeletePopupComponent
    ],
    entryComponents: [
        DiseaseGuangDongComponent,
        DiseaseGuangDongUpdateComponent,
        DiseaseGuangDongDeleteDialogComponent,
        DiseaseGuangDongDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationDiseaseGuangDongModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
