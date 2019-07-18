import { RobotMessageComponent } from './robot-message/robot-message.component';
import { ROBOT_ROUTE } from './robot.route';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MatPaginatorIntl } from '@angular/material';
import { Paginator } from 'app/shared/paginator/paginator';
import { JhiLanguageHelper } from 'app/core';
import { RobotUpdateComponent } from './robot-update/robot-update.component';

@NgModule({
    declarations: [
        RobotMessageComponent,
        RobotUpdateComponent
    ],
    imports: [
        JhipsterElasticsearchSampleApplicationSharedModule, RouterModule.forChild(ROBOT_ROUTE)
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        { provide: MatPaginatorIntl, useClass: Paginator }
    ]
})
export class JhiRobotModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
