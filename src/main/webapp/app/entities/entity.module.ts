import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'bank-account',
        loadChildren: './bank-account/bank-account.module#JhipsterElasticsearchSampleApplicationBankAccountModule'
    },
    {
        path: 'label',
        loadChildren: './label/label.module#JhipsterElasticsearchSampleApplicationLabelModule'
    },
    {
        path: 'operation',
        loadChildren: './operation/operation.module#JhipsterElasticsearchSampleApplicationOperationModule'
    },
    {
        path: 'disease-guang-dong',
        loadChildren: './disease-guang-dong/disease-guang-dong.module#JhipsterElasticsearchSampleApplicationDiseaseGuangDongModule'
    },
    {
        path: 'q-arobot',
        loadChildren: './q-arobot/q-arobot.module#JhipsterElasticsearchSampleApplicationQArobotModule'
    },
    {
        path: 'disease-xi-an',
        loadChildren: './disease-xi-an/disease-xi-an.module#JhipsterElasticsearchSampleApplicationDiseaseXiAnModule'
    },
    {
        path: 'disease-map',
        loadChildren: '../disease-map/disease-map.module#DiseaseMapModule'
    },
    {
        path: 'admin',
        loadChildren: '../admin/admin.module#JhipsterElasticsearchSampleApplicationAdminModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            appRoutes
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        )
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationEntityModule {}
