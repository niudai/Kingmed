import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VERSION } from 'app/app.constants';
import { AccountService, JhiLanguageHelper, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { IHelpLink } from 'app/shared/model/help-link.model';
import { NavButton } from 'app/shared/model/nav-button.model';
import { HelpLinkService } from 'app/shared/service/help-link.service';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.css']
})
export class NavbarComponent implements OnInit, OnChanges {
    @Input() rootPath: string;
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    currentUrl: string;
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    testNum: number;
    urlSegment: UrlSegment[];
    helpLink: IHelpLink;
    navButtons: NavButton[];
    adminMenuBtns: NavButton[] = [
        { routerLink: '/admin/user-management', content: '用户管理' },
        { routerLink: '/admin/jhi-metrics', content: '监控指标' },
        { routerLink: '/admin/jhi-health', content: '健康状态' },
        { routerLink: '/admin/jhi-configuration', content: '网站配置' },
        { routerLink: '/admin/audits', content: '审计' },
        { routerLink: '/admin/logs', content: '日志' },
        { routerLink: '/admin/docs', content: 'API文档' },
        { routerLink: '/admin/subsidiary', content: '子公司管理' },
        { routerLink: '/admin/concourse', content: '科室管理' },
        { routerLink: '/feedback', content: '反馈中心' },
        { routerLink: '/admin/help-link', content: '使用手册' }
    ];

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private sessionStorage: SessionStorageService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private helpLinkService: HelpLinkService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // rootPath change hook to change the btn color according to the current root path
        const tree: UrlTree = this.router.parseUrl(this.rootPath);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        this.urlSegment = g ? g.segments : null;
        this.navButtons.forEach(btn => (btn.isSelected = this.urlSegment[0].path === btn.routerLink ? true : false));
    }

    ngOnInit() {
        this.navButtons = [
            { routerLink: 'disease-xi-an', isSelected: false, content: '集团项目', icon: 'book-medical' },
            { routerLink: 'disease-map', isSelected: false, content: '疾病地图', icon: 'map-signs' },
            { routerLink: 'service', isSelected: false, content: '服务平台', icon: 'user-friends' },
            { routerLink: 'q-arobot', isSelected: false, content: '常见问题', icon: 'question' },
            { routerLink: 'notification', isSelected: false, content: '域知项情', icon: 'bullhorn' }
        ];
        this.helpLinkService.get().subscribe(links => (this.helpLink = links[0]));
        this.currentUrl = this.router.url.substr(1, Math.min(this.router.url.indexOf(';'), this.router.url.indexOf('/', 1)));
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        const tree: UrlTree = this.router.parseUrl(this.rootPath ? this.rootPath : this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        this.urlSegment = g.segments;
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    // call back for nav button selection
    selectNav(btn: NavButton) {
        this.navButtons.forEach(b => (b.isSelected = false));
        btn.isSelected = true;
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }
}
