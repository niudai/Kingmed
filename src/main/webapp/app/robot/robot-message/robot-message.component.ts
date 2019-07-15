import { IRobotMessage, RobotMessage } from './../../shared/model/robot-message.model';
import { RobotService } from './../robot.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
    selector: 'jhi-robot-message',
    templateUrl: './robot-message.component.html',
    styles: []
})
export class RobotMessageComponent implements OnInit {
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
        // this.messageBody.markdown.content = this.message;
        this.send();
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
        this.req = {
            key: 'a40d73df-6591-4eea-96a1-8fbe387d5aeb'
        };
    }

    send() {
        this.messageBody.msgtype = 'text';
        this.messageBody.text = {
            content: ''
        };
        this.messageBody.text.content = this.message;
        this.robotService.postMessage(this.messageBody, this.req)
            .subscribe();
    }

}
