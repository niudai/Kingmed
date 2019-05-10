import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import {
    DiseaseXiAnComponent,
    DiseaseXiAnDetailComponent,
    DiseaseXiAnUpdateComponent,
    DiseaseXiAnDeletePopupComponent,
    DiseaseXiAnDeleteDialogComponent,
    diseaseXiAnRoute,
    diseaseXiAnPopupRoute
} from './';

const ENTITY_STATES = [...diseaseXiAnRoute, ...diseaseXiAnPopupRoute];

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiseaseXiAnComponent,
        DiseaseXiAnDetailComponent,
        DiseaseXiAnUpdateComponent,
        DiseaseXiAnDeleteDialogComponent,
        DiseaseXiAnDeletePopupComponent
    ],
    entryComponents: [DiseaseXiAnComponent, DiseaseXiAnUpdateComponent, DiseaseXiAnDeleteDialogComponent, DiseaseXiAnDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationDiseaseXiAnModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
