import { MatPaginatorIntl } from '@angular/material';
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
import { DiseaseXiAnApplicationsComponent } from './disease-xi-an-applications/disease-xi-an-applications.component';
import { DiseaseXiAnApplicationsDeleteComponent } from './disease-xi-an-applications-delete/disease-xi-an-applications-delete.component';
import { DiseaseXiAnApplicationsUpdateComponent } from './disease-xi-an-applications-update/disease-xi-an-applications-update.component';
import { DiseaseXiAnSuppliessComponent } from './disease-xi-an-suppliess/disease-xi-an-suppliess.component';
import { DiseaseXiAnSuppliessDeleteComponent } from './disease-xi-an-suppliess-delete/disease-xi-an-suppliess-delete.component';
import { DiseaseXiAnSuppliessUpdateComponent } from './disease-xi-an-suppliess-update/disease-xi-an-suppliess-update.component';
import { Paginator } from 'app/shared/paginator/paginator';

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
        DiseaseXiAnApplicationsComponent,
        DiseaseXiAnApplicationsDeleteComponent,
        DiseaseXiAnApplicationsUpdateComponent,
        DiseaseXiAnSuppliessComponent,
        DiseaseXiAnSuppliessDeleteComponent,
        DiseaseXiAnSuppliessUpdateComponent,
    ],
    entryComponents: [DiseaseXiAnComponent, DiseaseXiAnUpdateComponent, DiseaseXiAnDeleteDialogComponent, DiseaseXiAnDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }
     , {provide: MatPaginatorIntl, useClass: Paginator}],
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
