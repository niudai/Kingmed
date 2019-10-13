import { Component, OnInit, HostListener } from '@angular/core';
import { NotificationService } from '../notifications.service';
import { INotification } from 'app/shared/model/notification.model';
import { MatDialogRef, MatDialog, MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material';
import { DeleteComponent } from '../delete/delete.component';
import { INtfType } from 'app/shared/model/ntf-type.model';
import { NTF_TYPE_FOR_DISEASE } from 'app/shared/util/disease-ntf-util';

@Component({
    selector: 'jhi-view',
    templateUrl: './view.component.html',
    styles: []
})
export class ViewComponent implements OnInit {
    notifications: INotification[];
    filteredNotifications: INotification[];
    beginDate: Date;
    endDate: Date;
    selectedType: string;
    ntfTypes = NTF_TYPE_FOR_DISEASE;
    innerWidth = window.innerWidth;
    constructor(
        private service: NotificationService,
        private dialog: MatDialog) {}

    onStartDateChanges(event: MatDatepickerInputEvent<Date>) {
        console.log(`Begin Date ${event.value.toISOString()}`);
        this.beginDate = event.value;
        this.filter();
    }

    onEndDateChange(event: MatDatepickerInputEvent<Date>) {
        console.log(`End Date ${event.value.toISOString()}`);
        this.endDate = event.value;
        this.filter();
    }

    filter() {
        this.filteredNotifications = this.notifications.filter(n => {
            console.log(n.createdDate);
            console.log(`comparing: ${n.createdDate} and ${this.beginDate} outCome ${n.createdDate > this.beginDate}`);
            const isValid = (this.beginDate ? n.createdDate.toString() >= this.beginDate.toISOString() : true)
             && (this.endDate ? n.createdDate.toString() <= this.endDate.toISOString() : true);
            return isValid;
        }).filter(n => this.selectedType ? n.type === this.selectedType : true);
    }

    btnColor(type: string) {
        if (type === 'UPDATE') {
            return 'blue';
        } else if (type === 'CREATE') {
            return 'green';
        } else if (type === 'STOP') {
            return '#df5b2c';
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
            this.filter();
            console.log(this.notifications);
        });
    }

    ngOnInit() {
        this.loadAll();
    }
}
