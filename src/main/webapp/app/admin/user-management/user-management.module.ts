import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageHelper } from 'app/core';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { JhiLanguageService } from 'ng-jhipster';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */
import { userMgmtRoute } from './user-management.route';
import { UserMgmtComponent, UserMgmtDetailComponent, UserMgmtUpdateComponent, UserMgmtDeleteDialogComponent } from '..';

@NgModule({
    imports: [
        JhipsterElasticsearchSampleApplicationSharedModule,
        RouterModule.forChild(userMgmtRoute)
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        UserMgmtComponent,
        UserMgmtDetailComponent,
        UserMgmtUpdateComponent,
        UserMgmtDeleteDialogComponent,
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    entryComponents: [
        UserMgmtDeleteDialogComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterElasticsearchSampleApplicationUserManagementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
