import { Component, OnInit } from '@angular/core';
import { faWeixin } from '@fortawesome/free-brands-svg-icons';
import { MatDialog } from '@angular/material';
import { FeedbackDialogComponent, FeedbackData } from '../feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'jhi-floating-action-btn',
  templateUrl: './floating-action-btn.component.html',
  styleUrls: ['./floating-action-btn.component.css']
})
export class FloatingActionBtnComponent implements OnInit {
  faWeixin = faWeixin;
  QRCODE_WIDTH = 100;
  widthOfQRCode: number;
  feedback: FeedbackData;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.widthOfQRCode = 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '600px',
      data: { content: '', phone: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.feedback = result;
    });
  }

  showWechatQRcode() {
    this.widthOfQRCode = this.QRCODE_WIDTH;
  }

  hideWechatQRcode() {
    this.widthOfQRCode = 0;
  }

}
