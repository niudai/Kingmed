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
    diseaseXiAnPopupRoute,
} from './';
import { DiseaseXiAnPricesComponent } from './disease-xi-an-prices/disease-xi-an-prices.component';
import { DiseaseXiAnPricesDeleteComponent } from './disease-xi-an-prices-delete/disease-xi-an-prices-delete.component';
import { DiseaseXiAnPricesUpdateComponent } from './disease-xi-an-prices-update/disease-xi-an-prices-update.component';
import { DiseaseXiAnQarobotsComponent } from './disease-xi-an-qarobots/disease-xi-an-qarobots.component';
import { DiseaseXiAnQarobotsDeleteComponent } from './disease-xi-an-qarobots-delete/disease-xi-an-qarobots-delete.component';
import { DiseaseXiAnQarobotsUpdateComponent } from './disease-xi-an-qarobots-update/disease-xi-an-qarobots-update.component';

const ENTITY_STATES = [...diseaseXiAnRoute, ...diseaseXiAnPopupRoute];

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiseaseXiAnComponent,
        DiseaseXiAnDetailComponent,
        DiseaseXiAnUpdateComponent,
        DiseaseXiAnDeleteDialogComponent,
        DiseaseXiAnDeletePopupComponent,
        DiseaseXiAnPricesComponent,
        DiseaseXiAnPricesDeleteComponent,
        DiseaseXiAnPricesUpdateComponent,
        DiseaseXiAnQarobotsComponent,
        DiseaseXiAnQarobotsDeleteComponent,
        DiseaseXiAnQarobotsUpdateComponent,
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
