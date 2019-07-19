import { IRobot } from 'app/shared/model/robot.model';
import { IRobot } from './../../shared/model/robot.model';
import { HttpResponse } from '@angular/common/http';
import { IRobotMessage, RobotMessage } from './../../shared/model/robot-message.model';
import { RobotService } from './../robot.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { MatSelectionListChange } from '@angular/material';

@Component({
    selector: 'jhi-robot-message',
    templateUrl: './robot-message.component.html',
    styles: []
})
export class RobotMessageComponent implements OnInit {
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

    @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

    constructor(
        protected robotService: RobotService,
        protected _ngZone: NgZone
    ) { }

    onSelectionChange(selectionList: MatSelectionListChange) {
        const selectedRobots = selectionList.source;
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
        ).subscribe( (res: HttpResponse<IRobot[]>) => {
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
        // var _robot: any;
        // for (_robot in robots) {
        //     this.req = {
        //         key: _robot.
        //     };
        // }
        this.robotService.postMessage(this.messageBody, this.req)
        .subscribe();
    }

}
