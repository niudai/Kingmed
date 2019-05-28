import { JhiLanguageHelper } from 'app/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';

import { ServiceSuppliesComponent } from './service-supplies.component';
import { serviceSuppliesRoute } from './service-supplies.route';
import { ServiceSuppliesUpdateComponent } from './service-supplies-update/service-supplies-update.component';
import { ServiceSuppliesDeleteComponent } from './service-supplies-delete/service-supplies-delete.component';
import { ServiceSuppliesCreateComponent } from './service-supplies-create/service-supplies-create.component';
import { ServiceSuppliesViewComponent } from './service-supplies-view/service-supplies-view.component';

@NgModule (
    {
        imports: [JhipsterElasticsearchSampleApplicationSharedModule
            , RouterModule.forChild(serviceSuppliesRoute)
            , ReactiveFormsModule],
        declarations: [
            ServiceSuppliesComponent,
            ServiceSuppliesUpdateComponent,
            ServiceSuppliesDeleteComponent,
            ServiceSuppliesCreateComponent,
            ServiceSuppliesViewComponent
        ],
        providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }
)
export class ServiceSuppliesModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
