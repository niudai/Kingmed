import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { activateRoute } from './../../account/activate/activate.route';
import { IRobot, Robot } from './../../shared/model/robot.model';
import { Component, OnInit } from '@angular/core';
import { RobotService } from '../robot.service';
import { MatDialog } from '@angular/material';
import { RobotMessageDeleteDialogComponent } from '../robot-message/robot-message.component';

@Component({
    selector: 'jhi-robot-update',
    templateUrl: './robot-update.component.html',
    styles: []
})
export class RobotUpdateComponent implements OnInit {
    robots: IRobot[];
    robot: IRobot;

    constructor(
        protected robotService: RobotService,
        protected route: ActivatedRoute,
        protected dialog: MatDialog
    ) { }

    ngOnInit() {
        this.fetchRobot();
        const id = +this.route.snapshot.paramMap.get('id');
        if (id) {
            this.robotService.find(id).subscribe(
                (any: HttpResponse<IRobot>) =>  this.onRobotFetchSuccess(any.body)
            );
        } else {
            this.robot = new Robot();
        }
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

    save() {
        if (this.robot.id === undefined) {
            this.robotService.create(this.robot).subscribe();
        } else {
            this.robotService.update(this.robot).subscribe();
        }
        window.history.back();
    }

    delete(_id: number) {
        const dialogRef = this.dialog.open(RobotMessageDeleteDialogComponent, {
            width: '250px',
            data: {id: _id}
          });
          dialogRef.afterClosed().subscribe(result => {
              this.fetchRobot();
            console.log('The dialog was closed');
          });
    }

    onRobotFetchSuccess(robot: IRobot) {
        this.robot = robot;
    }

}
