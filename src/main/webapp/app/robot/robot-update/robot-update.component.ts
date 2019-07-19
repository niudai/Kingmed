import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { activateRoute } from './../../account/activate/activate.route';
import { IRobot, Robot } from './../../shared/model/robot.model';
import { Component, OnInit } from '@angular/core';
import { RobotService } from '../robot.service';

@Component({
    selector: 'jhi-robot-update',
    templateUrl: './robot-update.component.html',
    styles: []
})
export class RobotUpdateComponent implements OnInit {
    robot: IRobot;

    constructor(
        protected robotService: RobotService,
        protected route: ActivatedRoute ) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id) {
            this.robotService.find(id).subscribe(
                (any: HttpResponse<IRobot>) =>  this.onRobotFetchSuccess(any.body)
            );
        } else {
            this.robot = new Robot();
        }
    }

    save() {
        if (this.robot.id === undefined) {
            this.robotService.create(this.robot).subscribe();
        } else {
            this.robotService.update(this.robot).subscribe();
        }
        window.history.back();
    }

    onRobotFetchSuccess(robot: IRobot) {
        this.robot = robot;
    }

}
