import { Component, OnInit, HostListener } from '@angular/core';
import { NotificationService } from '../notifications.service';
import { INotification } from 'app/shared/model/notification.model';
import { MatDialogRef, MatDialog, MatDatepickerInput, MatDatepickerInputEvent, PageEvent, MatSelectChange } from '@angular/material';
import { DeleteComponent } from '../delete/delete.component';
import { INtfType } from 'app/shared/model/ntf-type.model';
import { NTF_TYPE_FOR_DISEASE, NTF_TYPE_TRANSLATOR } from 'app/shared/util/disease-ntf-util';
import { ISubsidiary } from 'app/shared/model/subsidiary.model';
import { DiseaseXiAnService } from 'app/entities/disease-xi-an';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpParams, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
    notifications: INotification[];
    filteredNotifications: INotification[];
    beginDate: Date;
    endDate: Date;
    selectedType: string;
    selectedSub: ISubsidiary;
    ntfTypes = NTF_TYPE_FOR_DISEASE;
    ntfTranslator = NTF_TYPE_TRANSLATOR;
    innerWidth = window.innerWidth;
    subsidiaries: ISubsidiary[];
    pageEvent: PageEvent;
    totalItems: number;
    matrixParams: any = {};

    constructor(
        private ntfService: NotificationService,
        private diseaseXiAnService: DiseaseXiAnService,
        private dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router) {}

    onStartDateChanges(event: MatDatepickerInputEvent<Date>) {
        console.log(`Begin Date ${event.value.toISOString()}`);
        this.matrixParams['lowerBound'] = event.value.toISOString();
        this.beginDate = event.value;
        this.transitionAndLoadNtfs();
        // this.filter();
    }

    onEndDateChange(event: MatDatepickerInputEvent<Date>) {
        console.log(`End Date ${event.value.toISOString()}`);
        this.matrixParams['upperBound'] = event.value.toISOString();
        this.endDate = event.value;
        this.transitionAndLoadNtfs();
        // this.filter();
    }

    onSelectType(event: MatSelectChange) {
        this.matrixParams['type'] = event.value.toString();
        this.transitionAndLoadNtfs();
    }

    onSelectSubsidiary(event: MatSelectChange) {
        this.matrixParams['subsidiary'] = event.value;
        this.transitionAndLoadNtfs();
    }

    // filter() {
    //     this.filteredNotifications = this.notifications.filter(n => {
    //         console.log(n.createdDate);
    //         console.log(`comparing: ${n.createdDate} and ${this.beginDate} outCome ${n.createdDate > this.beginDate}`);
    //         const isValid = (this.beginDate ? n.createdDate.toString() >= this.beginDate.toISOString() : true)
    //          && (this.endDate ? n.createdDate.toString() <= this.endDate.toISOString() : true);
    //         return isValid;
    //     }).filter(n => this.selectedType ? n.type === this.selectedType : true)
    //     .filter(n => this.selectedSub ? n.subsidiary.id === this.selectedSub.id : true);
    // }

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
            this.loadNtfs();
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

    loadNtfs() {
        let params = new HttpParams();
        params = params.set('page', this.pageEvent.pageIndex.toString());
        params = params.set('size', this.pageEvent.pageSize.toString());
        if (this.matrixParams['subsidiary']) {
            params = params.set('subsidiaryId', this.matrixParams['subsidiary'].toString());
        }
        if (this.matrixParams['type']) {
            params = params.set('type', this.matrixParams['type']);
        }
        if (this.matrixParams['lowerBound']) {
            params = params.set('lowerBound', this.matrixParams['lowerBound'].toString());
        }
        if (this.matrixParams['upperBound']) {
            params = params.set('upperBound', this.matrixParams['upperBound'].toString());
        }
        this.ntfService
            .search(params)
            .subscribe(
                (res: HttpResponse<INotification[]>) => this.paginateNtfs(res.body, res.headers)
            );
        return;
    }

    onPagination($event: PageEvent) {
        if ($event) {
            this.pageEvent = $event;
        }
        this.matrixParams.size = this.pageEvent.pageSize;
        this.matrixParams.page = this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0;
        this.transitionAndLoadNtfs();
    }

    private transitionAndLoadNtfs() {
        this.transition();
        this.loadNtfs();
    }

    transition() {
        this.router.navigate([
            '/notification',
            this.matrixParams
        ]);
    }

    protected paginateNtfs(data: INotification[], headers: HttpHeaders) {
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.notifications = data;
    }

    ngOnInit() {
        this.pageEvent = new PageEvent();
        const params = this.activatedRoute.snapshot.params;
        Object.keys(params).forEach(
            key => {
                this.matrixParams[key] = params[key];
            }
        );
        this.pageEvent.pageIndex =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['page'] ? +this.activatedRoute.snapshot.params['page'] : 0;
        this.pageEvent.pageSize = ITEMS_PER_PAGE;
        this.loadNtfs();
        this.loadSubsidiaries();
    }

    loadSubsidiaries() {
        this.diseaseXiAnService.getAllSubsidiary().subscribe(res => {
            this.subsidiaries = res;
        });
    }
}
