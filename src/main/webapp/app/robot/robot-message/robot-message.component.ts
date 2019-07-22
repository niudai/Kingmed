import { IRobot } from './../../shared/model/robot.model';
import { HttpResponse } from '@angular/common/http';
import { IRobotMessage, RobotMessage } from './../../shared/model/robot-message.model';
import { RobotService } from './../robot.service';
import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { MatSelectionListChange, MatListOption, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { SNACKBAR_DURATION, SAVE_SUCCESSFUL } from 'app/app.constants';

@Component({
    selector: 'jhi-robot-message',
    templateUrl: './robot-message.component.html',
    styles: []
})
export class RobotMessageComponent implements OnInit {
    sendSuccessMessage = '发送成功';
    sendFailedMessage =  '发送失败';
    s: String;
    public robots: IRobot[];
    public selectedRobots: IRobot[];
    public message: string;
    public title: string;
    public description: string;
    public url: string;
    public picurl: string;
    public messageBody: IRobotMessage;
    public _messageBody: any;
    public messageType: string;
    req: any;

    robotObserver = {
        next: x => {
            this.snackBar.open(
                this.sendSuccessMessage, null, { duration: SNACKBAR_DURATION }
            );
          },
        error: err => {
              this.snackBar.open(
                  this.sendSuccessMessage, null, { duration: SNACKBAR_DURATION }
              );
        },
        complete: () => {
            this.snackBar.open(
                this.sendSuccessMessage, null, { duration: SNACKBAR_DURATION }
            );
          }
    };

    @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

    constructor(
        protected robotService: RobotService,
        protected _ngZone: NgZone,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar
    ) { }

    onSelectionChange(selectionList: MatSelectionListChange) {
        // this.selectedRobots[0] = selectionList.source.selectedOptions.selected[0].value;
        this.selectedRobots = selectionList.source.selectedOptions.selected.map(
            (any: MatListOption) => any.value
        );
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    setMsgType(msgType: string) {
        this.messageType = msgType;
    }

    markdown() {
        this.messageBody = new RobotMessage();
        this.messageBody.msgtype = 'markdown';
        this.messageBody.markdown.content = this.message;
    }

    sendMarkdown() {
        this.messageBody.msgtype = 'markdown';
        this.messageBody.markdown = {
            content: ''
        };
        this.messageBody.markdown.content = this.message;
        this.robotService.postMessage(this.messageBody, this.req)
            .subscribe();
    }

    sendCard() {
        this.messageBody.msgtype = 'news';
        this.messageBody.news = {
            articles: [
                {
                    title: '',
                    description: '',
                    url: '',
                    picurl: ''
                }
            ]
        };
        this.messageBody.news.articles[0].title = this.title;
        this.messageBody.news.articles[0].description = this.description;
        this.messageBody.news.articles[0].url = this.url;
        this.messageBody.news.articles[0].picurl = this.picurl;
        this.send();
    }

    ngOnInit() {
        this.messageBody = new RobotMessage();
        this.fetchRobot();
    }

    fetchRobot() {
        this.robotService.query(
            {
                size: 20,
                page: 0
            }
        ).subscribe((res: HttpResponse<IRobot[]>) => {
            this.robots = res.body;
        });
    }

    sendText() {
        this.messageBody.msgtype = 'text';
        this.messageBody.text = {
            content: ''
        };
        this.messageBody.text.content = this.message;
        this.send();
    }

    send() {

        for (const robot of this.selectedRobots) {
            this.robotService.postMessage(this.messageBody, robot.webhookUrl)
                .subscribe(this.robotObserver);
        }
    }

    delete(_id: number) {
        const dialogRef = this.dialog.open(RobotMessageDeleteDialogComponent, {
            width: '250px',
            data: {id: _id}
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }

}

@Component({
    selector: 'jhi-robot-message-delete-dialog',
    templateUrl: './robot-message-delete-dialog.component.html',
})
export class RobotMessageDeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<RobotMessageDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        protected robotService: RobotService) { }

    confirmDelete() {
        this.robotService.delete(this.data.id).subscribe();
        this.onNoClick();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
