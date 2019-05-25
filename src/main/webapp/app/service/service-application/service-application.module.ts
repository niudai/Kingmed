import { JhiLanguageHelper } from 'app/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { ServiceApplicationComponent } from './service-application.component';
import { serviceApplictionRoute } from './service-application.route';

@NgModule (
    {
        imports: [JhipsterElasticsearchSampleApplicationSharedModule
            , RouterModule.forChild(serviceApplictionRoute)
            , ReactiveFormsModule],
        declarations: [
            ServiceApplicationComponent
        ],
        providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
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
