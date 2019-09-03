import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { DiseaseXiAnService } from 'app/entities/disease-xi-an/disease-xi-an.service';
import { IDiseaseXiAn, diseaseXiAnToString } from 'app/shared/model/disease-xi-an.model';
import { ILinkCard, LinkCard } from 'app/shared/model/link-card.model';
import { PriceXiAn } from './../../shared/model/price-xi-an.model';
import { FeedbackDialogComponent } from 'app/layouts/navbar/feedback-dialog/feedback-dialog.component';

export interface ButtonInfo {
    content?: string;
    faIcon?: string;
    relativeUrl?: string;
    color?: string;
}

@Component({
    selector: 'jhi-disease-xi-an-detail',
    templateUrl: './disease-xi-an-detail.component.html',
    styleUrls: ['disease-xi-an-detail.component.css']
})
export class DiseaseXiAnDetailComponent implements OnInit {
    activatedToggleLabel: string;
    diseaseAboutIsOpen: boolean;
    projectAndPriceIsOpen: boolean;
    checkDemandsIsOpen: boolean;
    tatAboutIsOpen: boolean;
    remarkIsOpen: boolean;
    clinicalApplicationIsOpen: boolean; // 临床应用
    diseaseXiAn: IDiseaseXiAn;
    users: Account[];
    currentPrice: string;
    currentChargeCode: string;
    currentReportingTime: string;
    currentSubseries: string;
    stringExp: string;
    buttonInfos: ButtonInfo[] = [
        { content: '价格详情', faIcon: 'dollar-sign', relativeUrl: 'prices', color: ''},
        { content: '相关问题', faIcon: 'question', relativeUrl: 'qarobots', color: ''},
        { content: '申请单', faIcon: 'file-alt', relativeUrl: 'applications', color: ''},
        { content: '耗材图片', faIcon: 'magic', relativeUrl: 'suppliess', color: ''},
        { content: '相关项目', faIcon: 'book-medical', relativeUrl: 'diseases', color: ''},

    ];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected diseaseXiAnService: DiseaseXiAnService,
        protected dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) { }

    copyDetail(disease: IDiseaseXiAn) {
        // const para = document.createElement('textarea');
        // console.log(diseaseXiAnToString(disease));
        // para.value = diseaseXiAnToString(disease);
        // para.style.visibility = 'hidden';
        // document.body.appendChild(para);
        // para.focus();
        // para.select();
        const textarea = document.createElement('textarea');
        textarea.style.fontSize = '12pt';
        textarea.classList.add('cdk-visually-hidden');
        const t = window.pageYOffset || document.documentElement.scrollTop;
        textarea.style.top = t + 'px';
        textarea.setAttribute('readonly', '');
        textarea.value = this.stringExp;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        // const copyTextarea: HTMLTextAreaElement = document.querySelector('.js-copytextarea');
        // copyTextarea.focus();
        // copyTextarea.select();
        try {
            this._snackBar.open(document.execCommand('copy') ? '已复制至剪贴板' : '复制失败', '', { duration: 1000} );
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textarea);
    }

    projectAndPriceIsOpenToggle() {
        this.projectAndPriceIsOpen = !this.projectAndPriceIsOpen;
    }

    checkDemandsIsOpenToggle() {
        this.checkDemandsIsOpen = !this.checkDemandsIsOpen;
    }

    tatAboutIsOpenToggle() {
        this.tatAboutIsOpen = !this.tatAboutIsOpen;
    }

    remarkIsOpenToggle() {
        this.remarkIsOpen = !this.remarkIsOpen;
    }

    clinicalApplicationIsOpenToggle() {
        this.clinicalApplicationIsOpen = !this.clinicalApplicationIsOpen;
    }

    diseaseAboutIsOpenToggle() {
        this.diseaseAboutIsOpen = !this.diseaseAboutIsOpen;
    }

    activateDiseaseXiAn() {
        this.diseaseXiAn.activated = !this.diseaseXiAn.activated;
        this.activatedToggleLabel = this.diseaseXiAn.activated ? '正常运行' : '暂停运行';
        this.diseaseXiAnService.activate(this.diseaseXiAn.id, this.diseaseXiAn.activated)
            .subscribe();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(FeedbackDialogComponent, {
            width: '600px',
            data: { content: '', phone: '' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.service.create(result).subscribe(any => this.snackBar.open(this.feedbackSuccessMsg));
        });
    }

    ngOnInit() {
        this.projectAndPriceIsOpen = true;
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
            this.stringExp = diseaseXiAnToString(this.diseaseXiAn);
            this.diseaseXiAnService.getUsers(this.diseaseXiAn.id)
                .subscribe( res => this.users = res.body);
        });
        this.activatedToggleLabel = this.diseaseXiAn.activated ? '运行' : '已停用';
        this.currentChargeCode = this.diseaseXiAn.chargeCode;
        this.currentPrice = this.diseaseXiAn.tollStandard;
        this.currentReportingTime = this.diseaseXiAn.reportingTime;
        this.currentSubseries = this.currentSubseries;
    }

    openDeleteDialog(link: ILinkCard): void {
        const dialogRef = this.dialog.open(ArticleMatDeleteDialogComponent, {
            width: '250px',
            data: {
                diseaseXiAn: this.diseaseXiAn,
                linkCard: link
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.fetchDiseaseXiAn();
        });
    }

    openCreateDialog(link: ILinkCard): void {
        const dialogRef = this.dialog.open(ArticleMatCreateDialogComponent, {
            width: '250px',
            data: {
                linkCard: link ? link : new LinkCard()
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.diseaseXiAnService.addArticle(result, this.diseaseXiAn.id).subscribe(any => {
                    this.fetchDiseaseXiAn();
                }
            );
        });
    }

    fetchDiseaseXiAn() {
        this.diseaseXiAnService.find(this.diseaseXiAn.id).subscribe(
            res => this.diseaseXiAn = res.body
        );
    }

    public currentToggle(price: PriceXiAn): void {
        this.currentPrice = price.tollStandard;
        this.currentChargeCode = price.chargeCode;
        this.currentReportingTime = price.reportingTime;
        this.currentSubseries = price.subseries;
    }

    public currentDefault(): void {
        this.currentPrice = this.diseaseXiAn.tollStandard;
        this.currentChargeCode = this.diseaseXiAn.chargeCode;
        this.currentReportingTime = this.diseaseXiAn.reportingTime;
        this.currentSubseries = this.diseaseXiAn.subSeries;
    }

    previousState() {
        window.history.back();
    }

}

@Component({
    selector: 'jhi-article-delete-dialog',
    templateUrl: './article-delete-dialog.component.html'
})
export class ArticleMatDeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ArticleMatDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected service: DiseaseXiAnService,
        protected router: Router) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.deleteArticle(this.data.linkCard, 3).subscribe(
            any => this.dialogRef.close()
        );
    }
}

@Component({
    selector: 'jhi-article-create-dialog',
    templateUrl: './article-create-dialog.component.html'
})
export class ArticleMatCreateDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ArticleMatDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected router: Router) { }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
