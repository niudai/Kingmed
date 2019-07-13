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
    massage: string;
    massageBody: IRobotMessage;
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

    ngOnInit() {
        this.massageBody = new RobotMessage(
            'text',
            {
                'content': ''
            }
        );
        this.req = {
            key: 'a40d73df-6591-4eea-96a1-8fbe387d5aeb'
        };
    }

    send() {
        this.robotService.postMessage(this.massageBody, this.req)
            .subscribe();
    }

}
