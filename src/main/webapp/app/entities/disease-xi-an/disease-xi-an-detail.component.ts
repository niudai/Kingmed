import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatBottomSheet } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { DiseaseXiAnService } from 'app/entities/disease-xi-an/disease-xi-an.service';
import { IDiseaseXiAn, diseaseXiAnToString } from 'app/shared/model/disease-xi-an.model';
import { ILinkCard, LinkCard } from 'app/shared/model/link-card.model';
import { PriceXiAn, IPriceXiAn } from './../../shared/model/price-xi-an.model';
import { FeedbackDialogComponent } from 'app/layouts/navbar/feedback-dialog/feedback-dialog.component';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { IComment } from 'app/shared/model/comment.model';
import { CommentBottomSheetComponent } from './comment-bottom-sheet/comment-bottom-sheet.component';
import { DiseaseXiAnMatDeleteDialogComponent } from './disease-xi-an-delete-dialog.component';
import { AccountService } from 'app/core';

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
    comments: IComment[];
    prices: IPriceXiAn[];
    selectedPrice: IPriceXiAn;
    activatedToggleLabel: string;
    remarkIsOpen: boolean;
    clinicalApplicationIsOpen: boolean; // 临床应用
    diseaseXiAn: IDiseaseXiAn;
    users: Account[];
    feedbackSuccessMsg = '反馈成功';

    buttonInfos: ButtonInfo[] = [
        { content: '相关问题', faIcon: 'question', relativeUrl: 'qarobots', color: '' },
        { content: '申请单', faIcon: 'file-alt', relativeUrl: 'applications', color: '' },
        { content: '耗材图片', faIcon: 'magic', relativeUrl: 'suppliess', color: '' },
        { content: '相关项目', faIcon: 'book-medical', relativeUrl: 'diseases', color: '' }
    ];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected diseaseXiAnService: DiseaseXiAnService,
        protected dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _bottomSheet: MatBottomSheet,
        private accountService: AccountService
    ) {}

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
        textarea.value = diseaseXiAnToString(disease);
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        // const copyTextarea: HTMLTextAreaElement = document.querySelector('.js-copytextarea');
        // copyTextarea.focus();
        // copyTextarea.select();
        try {
            this._snackBar.open(document.execCommand('copy') ? '已复制至剪贴板' : '复制失败', '', { duration: 1000 });
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textarea);
    }

    clinicalApplicationIsOpenToggle() {
        this.clinicalApplicationIsOpen = !this.clinicalApplicationIsOpen;
    }

    activateDiseaseXiAn() {
        this.diseaseXiAn.activated = !this.diseaseXiAn.activated;
        this.activatedToggleLabel = this.diseaseXiAn.activated ? '正常运行' : '暂停运行';
        this.diseaseXiAnService.activate(this.diseaseXiAn.id, this.diseaseXiAn.activated).subscribe();
    }

    openCommentBottomSheet(): void {
        const sheetRef = this._bottomSheet.open(CommentBottomSheetComponent, {
            data: {
                comments: this.comments,
                diseaseXiAn: this.diseaseXiAn
            }
        });
        sheetRef.afterDismissed().subscribe(any => this.fetchComments());
    }

    ngOnInit() {
        if (this.accountService.hasAnyAuthority(['ROLE_ADMIN'])) {
            this.buttonInfos.push({ content: '价格详情', faIcon: 'dollar-sign', relativeUrl: 'prices', color: '' });
        }
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
            this.prices = this.diseaseXiAn.prices;
            this.prices.forEach(p => (p.isSelected = false));
            this.selectedPrice = {
                subsidiary: this.diseaseXiAn.subsidiary,
                tollStandard: this.diseaseXiAn.tollStandard,
                reportingTime: this.diseaseXiAn.reportingTime,
                chargeCode: this.diseaseXiAn.chargeCode,
                subseries: this.diseaseXiAn.subSeries,
                isSelected: true
            };
            this.prices.push(this.selectedPrice);
            this.diseaseXiAnService.getUsers(this.diseaseXiAn.id).subscribe(res => (this.users = res.body));
            this.fetchComments();
        });
        this.activatedToggleLabel = this.diseaseXiAn.activated ? '运行' : '已停用';
    }

    private fetchComments() {
        this.diseaseXiAnService.queryComment(this.diseaseXiAn.id).subscribe(res => (this.comments = res.body));
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
            });
        });
    }

    fetchDiseaseXiAn() {
        this.diseaseXiAnService.find(this.diseaseXiAn.id).subscribe(res => (this.diseaseXiAn = res.body));
    }

    public togglePrice(price: PriceXiAn): void {
        this.selectedPrice.isSelected = false;
        this.selectedPrice = price;
        this.selectedPrice.isSelected = true;
        this.diseaseXiAn.subsidiary = this.selectedPrice.subsidiary;
        this.diseaseXiAn.tollStandard = this.selectedPrice.tollStandard;
        this.diseaseXiAn.reportingTime = this.selectedPrice.reportingTime;
        this.diseaseXiAn.chargeCode = this.selectedPrice.chargeCode;
        this.diseaseXiAn.subSeries = this.selectedPrice.subseries;
        this._snackBar.open(`当前价格已切换至${price.subsidiary}`, null, { duration: 1000 });
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
        protected router: Router
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.service.deleteArticle(this.data.linkCard, 3).subscribe(any => this.dialogRef.close());
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
        protected router: Router
    ) {}

    ngOnInit(): void {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
