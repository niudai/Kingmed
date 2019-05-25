import { JhiLanguageHelper } from 'app/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicePlatformComponent } from './service-platform.component';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { servicePlatformRoute } from './service-platform.route';
import { JhiLanguageService } from 'ng-jhipster';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';

@NgModule (
    {
        imports: [JhipsterElasticsearchSampleApplicationSharedModule
            , RouterModule.forChild(servicePlatformRoute)
            , ReactiveFormsModule],
        declarations: [
            ServicePlatformComponent
        ],
        providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }
)
export class ServicePlatformModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
