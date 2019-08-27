import { Component, OnInit } from '@angular/core';
import { faWeixin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'jhi-floating-action-btn',
  templateUrl: './floating-action-btn.component.html',
  styleUrls: ['./floating-action-btn.component.css']
})
export class FloatingActionBtnComponent implements OnInit {
  faWeixin = faWeixin;
  QRCODE_WIDTH = 100;
  widthOfQRCode: number;
  constructor() { }

  ngOnInit() {
    this.widthOfQRCode = 0;
  }

  showWechatQRcode() {
    this.widthOfQRCode = this.QRCODE_WIDTH;
  }

  hideWechatQRcode() {
    this.widthOfQRCode = 0;
  }

}