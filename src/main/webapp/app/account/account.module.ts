import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { RouterModule } from '@angular/router';
import { JhiLanguageHelper } from 'app/core';
import { DiseaseXiAnDetailBottomSheetComponent } from 'app/entities/disease-xi-an/disease-xi-an-detail-bottom-sheet/disease-xi-an-detail-bottom-sheet.component';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { JhiLanguageService } from 'ng-jhipster';
import { accountState, ActivateComponent, PasswordComponent, PasswordResetFinishComponent, PasswordResetInitComponent, PasswordStrengthBarComponent, RegisterComponent, SettingsComponent } from './';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main/main.component';
import { MyDiseaseCreateComponent } from './my-disease/my-disease-create/my-disease-create.component';
import { MyDiseaseDeleteDialogComponent } from './my-disease/my-disease-delete-dialog/my-disease-delete-dialog.component';
import { MyDiseaseComponent } from './my-disease/my-disease/my-disease.component';
import { MyMapDeleteDialogComponent } from './my-map/my-map-delete-dialog/my-map-delete-dialog.component';
import { MyMapComponent } from './my-map/my-map.component';

@NgModule({
    imports: [
        JhipsterElasticsearchSampleApplicationSharedModule,
        RouterModule.forChild(accountState)
    ],
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
        AccountSettingsComponent,
        MyMapComponent,
        MainComponent,
        IndexComponent,
        MyMapDeleteDialogComponent
    ],
    entryComponents: [
        MyDiseaseDeleteDialogComponent,
        MyMapDeleteDialogComponent,
        DiseaseXiAnDetailBottomSheetComponent
    ],
    bootstrap: [
        IndexComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    ],
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
