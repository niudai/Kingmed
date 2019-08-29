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

    ngOnInit() {
        this.service.query().subscribe(
            response => this.notifications = response.body
        );
    }
}
