import { Component, OnInit, HostListener } from '@angular/core';
import { NotificationService } from '../notifications.service';
import { INotification } from 'app/shared/model/notification.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DeleteComponent } from '../delete/delete.component';

@Component({
    selector: 'jhi-view',
    templateUrl: './view.component.html',
    styles: []
})
export class ViewComponent implements OnInit {
    fromDate:
    notifications: INotification[];
    innerWidth = window.innerWidth;
    constructor(
        private service: NotificationService,
        private dialog: MatDialog) {}

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

    onDelete(ntf: INotification) {
        const dialogRef = this.dialog.open(DeleteComponent, {
            width: '500px',
            data: { ntf }
        });

        dialogRef.afterClosed().subscribe(result => {
            //   console.log('The dialog was closed');
            this.loadAll();
        });    }

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

    loadAll() {
        this.service.query().subscribe(response => {
            this.notifications = response.body;
            console.log('notification fetch finished!!!!');
            console.log(this.notifications);
        });
    }

    ngOnInit() {
        this.loadAll();
    }
}
