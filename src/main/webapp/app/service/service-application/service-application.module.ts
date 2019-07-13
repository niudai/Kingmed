import { MatPaginatorIntl } from '@angular/material';
import { JhiLanguageHelper } from 'app/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { ServiceApplicationComponent } from './service-application.component';
import { serviceApplictionRoute } from './service-application.route';
import { ServiceApplicationUpdateComponent } from './service-application-name/service-application-update.component';
import { ServiceApplicationDeleteComponent } from './service-application-delete/service-application-delete.component';
import { ServiceApplicationCreateComponent } from './service-application-create/service-application-create.component';
import { ServiceApplicationViewComponent } from './service-application-view/service-application-view.component';
import { Paginator } from 'app/shared/paginator/paginator';

@NgModule (
    {
        imports: [JhipsterElasticsearchSampleApplicationSharedModule
            , RouterModule.forChild(serviceApplictionRoute)
            , ReactiveFormsModule],
        declarations: [
            ServiceApplicationComponent,
            ServiceApplicationUpdateComponent,
            ServiceApplicationDeleteComponent,
            ServiceApplicationCreateComponent,
            ServiceApplicationViewComponent
        ],
        providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService },
            { provide: MatPaginatorIntl, useClass: Paginator}],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }
)
export class ServiceApplicationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
