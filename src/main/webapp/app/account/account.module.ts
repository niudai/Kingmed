import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';

import {
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { MyDiseaseComponent } from './my-disease/my-disease/my-disease.component';
import { MyDiseaseDeleteDialogComponent } from './my-disease/my-disease-delete-dialog/my-disease-delete-dialog.component';
import { MyDiseaseCreateComponent } from './my-disease/my-disease-create/my-disease-create.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    imports: [JhipsterElasticsearchSampleApplicationSharedModule, RouterModule.forChild(accountState)],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        MyDiseaseComponent,
        MyDiseaseDeleteDialogComponent,
        MyDiseaseCreateComponent,
        AccountSettingsComponent
    ],
    entryComponents: [
        MyDiseaseDeleteDialogComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationAccountModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
