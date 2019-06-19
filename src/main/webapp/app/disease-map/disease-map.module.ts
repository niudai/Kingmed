import { RouterModule } from '@angular/router';
import { DiseaseMapAssociateQArobotComponent } from './disease-map-associate-q-arobot/disease-branch-map-associate-q-arobot.component';
import { DiseaseMapAssociateDiseaseXiAnComponent } from './disease-map-associate-disease-xi-an/disease-branch-map-associate-disease-xi-an.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from './../shared/shared.module';
import { JhipsterElasticsearchSampleApplicationSharedCommonModule } from './../shared/shared-common.module';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DiseaseBranchComponent, DiseaseBranchDeleteModalComponent } from './disease-branch/disease-branch.component';
import { DiseaseMapComponent, DiseaseMapActionBottomSheetComponent } from './disease-map/disease-map.component';
import { DiseaseBranchCreateComponent } from './disease-branch-create/disease-branch-create.component';
import { DiseaseBranchDeleteComponent } from './disease-branch-delete/disease-branch-delete.component';
import { DiseaseMapCreateComponent } from './disease-map-create/disease-map-create.component';
import { DiseaseBranchCreateDiseaseMapComponent } from './disease-branch-create-disease-map/disease-branch-create-disease-map.component';
import { SERIVCE_ROUTE } from './disease-map.route';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
    imports: [
        RouterModule.forChild(SERIVCE_ROUTE),
        JhipsterElasticsearchSampleApplicationSharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        DiseaseBranchComponent
        , DiseaseMapComponent
        , DiseaseBranchCreateComponent
        , DiseaseBranchDeleteComponent
        , DiseaseMapAssociateQArobotComponent
        , DiseaseMapAssociateDiseaseXiAnComponent
        , DiseaseMapCreateComponent
        , DiseaseBranchCreateDiseaseMapComponent
        , DiseaseBranchDeleteModalComponent
        , DiseaseMapActionBottomSheetComponent
    ],
    entryComponents: [
        DiseaseBranchDeleteModalComponent
        , DiseaseMapActionBottomSheetComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiseaseMapModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
