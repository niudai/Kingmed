import { MatPaginatorIntl } from '@angular/material';
import { DiseaseXiAnDeleteDialogComponent, QArobotDeleteDialogComponent, DiseaseBranchModifyDialogComponent, DiseaseMapModifyDialogComponent } from './disease-map/disease-map.component';
import { RouterModule } from '@angular/router';
import { DiseaseMapAssociateQArobotComponent } from './disease-map-associate-q-arobot/disease-branch-map-associate-q-arobot.component';
import { DiseaseMapAssociateDiseaseXiAnComponent } from './disease-map-associate-disease-xi-an/disease-branch-map-associate-disease-xi-an.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from './../shared/shared.module';
import { DiseaseBranchComponent, DiseaseBranchDeleteModalComponent } from './disease-branch/disease-branch.component';
import { DiseaseMapComponent, DiseaseMapActionBottomSheetComponent, DiseaseBranchActionBottomSheetComponent, DiseaseBranchCreateDiseaseMapDialogComponent, DiseaseMapAssociateDialogComponent, DiseaseMapDeleteDialogComponent } from './disease-map/disease-map.component';
import { DiseaseBranchCreateComponent } from './disease-branch-create/disease-branch-create.component';
import { DiseaseBranchDeleteComponent } from './disease-branch-delete/disease-branch-delete.component';
import { DiseaseMapCreateComponent } from './disease-map-create/disease-map-create.component';
import { DiseaseBranchCreateDiseaseMapComponent } from './disease-branch-create-disease-map/disease-branch-create-disease-map.component';
import { SERIVCE_ROUTE } from './disease-map.route';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Paginator } from 'app/shared/paginator/paginator';
import { DiseaseBranchCreateLinkDialogComponent } from './disease-branch-create/disease-branch-create-link-dialog/disease-branch-create-link-dialog.component';
import { DiseaseBranchDeleteLinkDialogComponent } from './disease-branch-create/disease-branch-delete-link-dialog/disease-branch-delete-link-dialog.component';
import { DiseaseMapDeleteLinkDialogComponent } from './disease-map-create/disease-map-delete-link-dialog/disease-map-delete-link-dialog.component';
import { DiseasePartitionComponent } from './disease-partition/disease-partition.component';
import { DiseasePartitionCreateComponent } from './disease-partition-create/disease-partition-create.component';

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
        , DiseaseBranchActionBottomSheetComponent
        , DiseaseBranchCreateDiseaseMapDialogComponent
        , DiseaseMapAssociateDialogComponent
        , DiseaseMapDeleteDialogComponent
        , DiseaseXiAnDeleteDialogComponent
        , QArobotDeleteDialogComponent
        , DiseaseBranchModifyDialogComponent
        , DiseaseMapModifyDialogComponent
        , DiseaseBranchCreateLinkDialogComponent
        , DiseaseBranchDeleteLinkDialogComponent
        , DiseaseMapDeleteLinkDialogComponent, DiseasePartitionComponent, DiseasePartitionCreateComponent
    ],
    entryComponents: [
        DiseaseBranchDeleteModalComponent
        , DiseaseMapActionBottomSheetComponent
        , DiseaseBranchActionBottomSheetComponent
        , DiseaseBranchCreateDiseaseMapDialogComponent
        , DiseaseMapAssociateDialogComponent
        , DiseaseMapDeleteDialogComponent
        , DiseaseXiAnDeleteDialogComponent
        , DiseaseBranchModifyDialogComponent
        , QArobotDeleteDialogComponent
        , DiseaseMapModifyDialogComponent
        , DiseaseBranchCreateLinkDialogComponent
        , DiseaseBranchDeleteLinkDialogComponent
        , DiseaseMapDeleteLinkDialogComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService }]
        // { provide: MatPaginatorIntl, useClass: Paginator}], // schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
