import { IRobotMessage, RobotMessage } from './../../shared/model/robot-message.model';
import { RobotService } from './../robot.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-robot-message',
    templateUrl: './robot-message.component.html',
    styles: []
})
export class RobotMessageComponent implements OnInit {
    massageBody: IRobotMessage;
    req: any;
    constructor(protected robotService: RobotService) { }

    ngOnInit() {
        this.massageBody = new RobotMessage(
            'text',
            {
                'content': '测试信息'
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
