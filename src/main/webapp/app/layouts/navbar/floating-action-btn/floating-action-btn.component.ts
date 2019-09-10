import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { faWeixin } from '@fortawesome/free-brands-svg-icons';
import { IFeedback } from 'app/shared/model/feedback.model';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { FeedbackService } from '../feedback-dialog/feedback.service';

@Component({
    selector: 'jhi-floating-action-btn',
    templateUrl: './floating-action-btn.component.html',
    styleUrls: ['./floating-action-btn.component.css']
})
export class FloatingActionBtnComponent implements OnInit {
    faWeixin = faWeixin;
    QRCODE_WIDTH = 100;
    widthOfQRCode: number;
    feedback: IFeedback;
    feedbackSuccessMsg = '反馈成功';
    pageXOffset: number;
    topBtnHeight = 'startHeight';
    constructor(private dialog: MatDialog, private service: FeedbackService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.widthOfQRCode = 0;
    }

    @HostListener('window:scroll')
    onScroll() {
        if (window.pageYOffset < window.innerHeight) {
            this.topBtnHeight = '0';
        } else {
            this.topBtnHeight = '60px';
        }
        console.log(this.topBtnHeight);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(FeedbackDialogComponent, {
            width: '600px',
            data: { content: '', phone: '' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.feedback = result;
            this.service.create(this.feedback).subscribe(
                any => this.snackBar.open(this.feedbackSuccessMsg, null, { duration: 1000})
                );
        });
    }

    scrollToTop() {
        window.scrollTo(pageXOffset, 0);
    }

    showWechatQRcode() {
        this.widthOfQRCode = this.QRCODE_WIDTH;
    }

    hideWechatQRcode() {
        this.widthOfQRCode = 0;
    }
}
