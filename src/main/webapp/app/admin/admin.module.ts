import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiMetricsMonitoringComponent,
    JhiHealthModalComponent,
    JhiHealthCheckComponent,
    JhiConfigurationComponent,
    JhiDocsComponent
} from './';
import { SubsidiaryAdminComponent } from './subsidiary-admin/subsidiary-admin.component';
import { ConcourseAdminComponent } from './concourse-admin/concourse-admin.component';
import { CreateComponent } from 'app/entities/disease-xi-an/concourse/create-dialog/create-dialog.component';
import { CreateDialogComponent } from 'app/entities/disease-xi-an/subsidiary/create/create.component';
import { DeleteDialogComponent } from './subsidiary-admin/delete-dialog/delete-dialog.component';
import { UpdateComponent } from './subsidiary-admin/update/update.component';
import { ConcourseUpdateComponent } from './concourse-admin/update/concourse-update/concourse-update.component';
import { ConcourseDeleteDialogComponent } from './concourse-admin/delete-dialog/concourse-delete-dialog/concourse-delete-dialog.component';
import { HelpLinkComponent } from './help-link/help-link.component';

@NgModule({
    imports: [
        JhipsterElasticsearchSampleApplicationSharedModule,
        RouterModule.forChild(adminState)
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        LogsComponent,
        JhiConfigurationComponent,
        JhiHealthCheckComponent,
        JhiHealthModalComponent,
        JhiDocsComponent,
        JhiMetricsMonitoringComponent,
        SubsidiaryAdminComponent,
        ConcourseAdminComponent,
        CreateComponent,
        CreateDialogComponent,
        DeleteDialogComponent,
        UpdateComponent,
        ConcourseUpdateComponent,
        ConcourseDeleteDialogComponent,
        HelpLinkComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    entryComponents: [
        JhiHealthModalComponent,
        CreateComponent,
        CreateDialogComponent,
        DeleteDialogComponent,
        UpdateComponent,
        ConcourseUpdateComponent,
        ConcourseDeleteDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationAdminModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
