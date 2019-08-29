import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notifications.service';
import { INotification } from 'app/shared/model/notification.model';

@Component({
    selector: 'jhi-view',
    templateUrl: './view.component.html',
    styles: []
})
export class ViewComponent implements OnInit {
    notifications: INotification[];

    constructor(private service: NotificationService) {}

    btnColor(type: string) {
        if (type === 'UPDATE') {
            return 'blue';
        } else if (type === 'CREATE') {
            return 'green';
        } else if (type === 'STOP') {
            return 'yellow';
        } else if (type === 'DELETE') {
            return 'red';
        } else {
            return 'white';
        }
    }

    btnContent(type: string): string {
        if (type === 'UPDATE') {
            return '项目更新';
        } else if (type === 'CREATE') {
            return '项目新建';
        } else if (type === 'STOP') {
            return '项目停做';
        } else if (type === 'DELETE') {
            return '项目删除';
        } else {
            return '未定义';
        }
    }

    ngOnInit() {
        this.service.query().subscribe(response => {
            this.notifications = response.body;
            console.log('notification fetch finished!!!!');
            console.log(this.notifications);
        });
    }
}
