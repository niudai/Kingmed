import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'bank-account',
                loadChildren: () => import('./bank-account/bank-account.module').then(m => m.JhipsterElasticsearchSampleApplicationBankAccountModule)
            },
            {
                path: 'label',
                loadChildren: () => import('./label/label.module').then(m => m.JhipsterElasticsearchSampleApplicationLabelModule)
            },
            {
                path: 'operation',
                loadChildren: () => import('./operation/operation.module').then(m => m.JhipsterElasticsearchSampleApplicationOperationModule)
            },
            {
                path: 'disease-guang-dong',
                loadChildren: () => import('./disease-guang-dong/disease-guang-dong.module').then(m => m.JhipsterElasticsearchSampleApplicationDiseaseGuangDongModule)
            },
            {
                path: 'q-arobot',
                loadChildren: () => import('./q-arobot/q-arobot.module').then(m => m.JhipsterElasticsearchSampleApplicationQArobotModule)
            },
            {
                path: 'disease-xi-an',
                loadChildren: () => import('./disease-xi-an/disease-xi-an.module').then(m => m.JhipsterElasticsearchSampleApplicationDiseaseXiAnModule)
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationEntityModule {}
