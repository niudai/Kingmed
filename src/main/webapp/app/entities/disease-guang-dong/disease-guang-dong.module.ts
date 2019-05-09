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
import { DiseaseGuangDongPricesComponent } from './disease-guang-dong-prices/disease-guang-dong-prices.component';
import { DiseaseGuangDongPricesUpdateComponent } from './disease-guang-dong-prices-update/disease-guang-dong-prices-update.component';
import { DiseaseGuangDongPricesDeleteComponent } from './disease-guang-dong-prices-delete/disease-guang-dong-prices-delete.component';
import { DiseaseGuangDongPricesDeletePopupComponent } from './disease-guang-dong-prices-delete/disease-guang-dong-prices-delete.component';

const ENTITY_STATES = [...diseaseGuangDongRoute, ...diseaseGuangDongPopupRoute];

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiseaseGuangDongComponent,
        DiseaseGuangDongDetailComponent,
        DiseaseGuangDongUpdateComponent,
        DiseaseGuangDongDeleteDialogComponent,
        DiseaseGuangDongDeletePopupComponent,
        DiseaseGuangDongPricesComponent,
        DiseaseGuangDongPricesUpdateComponent,
        DiseaseGuangDongPricesDeleteComponent,
        DiseaseGuangDongPricesDeletePopupComponent
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
