import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import './vendor.ts';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule, JhiLanguageService } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JhipsterElasticsearchSampleApplicationSharedModule } from 'app/shared';
import { JhipsterElasticsearchSampleApplicationCoreModule } from 'app/core';
import { JhipsterElasticsearchSampleApplicationAppRoutingModule } from './app-routing.module';
import { JhipsterElasticsearchSampleApplicationEntityModule } from './entities/entity.module';
import { JhipsterElasticsearchSampleApplicationServiceModule } from './service/service.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { NavigationBackComponent } from './shared/navigation/navigation-back.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        JhipsterElasticsearchSampleApplicationSharedModule.forRoot(),
        JhipsterElasticsearchSampleApplicationCoreModule,
        JhipsterElasticsearchSampleApplicationServiceModule,
        JhipsterElasticsearchSampleApplicationEntityModule,
        JhipsterElasticsearchSampleApplicationAppRoutingModule,
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent
        , HomeComponent, NavigationBackComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        {
            provide: JhiLanguageService,
            useClass: JhiLanguageService
        }
    ],
    bootstrap: [JhiMainComponent],

})
export class JhipsterElasticsearchSampleApplicationAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
