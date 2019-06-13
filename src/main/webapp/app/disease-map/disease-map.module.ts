import { DiseaseMapAssociateQArobotComponent } from './disease-map-associate-q-arobot/disease-branch-map-asociate-q-arobot.component';
import { DiseaseMapAssociateDiseaseXiAnComponent } from './disease-map-associate-disease-xi-an/disease-branch-map-asociate-disease-xi-an.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from './../shared/shared.module';
import { JhipsterElasticsearchSampleApplicationSharedCommonModule } from './../shared/shared-common.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseaseBranchComponent } from './disease-branch/disease-branch.component';
import { DiseaseMapComponent } from './disease-map/disease-map.component';
import { DiseaseBranchCreateComponent } from './disease-branch-create/disease-branch-create.component';
import { DiseaseBranchDeleteComponent } from './disease-branch-delete/disease-branch-delete.component';
import { DiseaseMapCreateComponent } from './disease-map-create/disease-map-create.component';
import { DiseaseBranchCreateDiseaseMapComponent } from './disease-branch-create-disease-map/disease-branch-create-disease-map.component';

@NgModule({
  declarations: [DiseaseBranchComponent, DiseaseMapComponent, DiseaseBranchCreateComponent, DiseaseBranchDeleteComponent, DiseaseMapAssociateQArobotComponent, DiseaseMapAssociateDiseaseXiAnComponent, DiseaseMapCreateComponent, DiseaseBranchCreateDiseaseMapComponent],
  imports: [
    CommonModule,
    JhipsterElasticsearchSampleApplicationSharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiseaseMapModule { }
