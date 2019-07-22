import { PageEvent } from '@angular/material';
import { IDiseaseBranch } from './../../shared/model/disease-branch.model';
import { DiseaseMapService } from './../disease-map.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-disease-branch',
    templateUrl: './disease-branch.component.html',
    styleUrls: ['./disease-branch.component.css']
})
export class DiseaseBranchComponent implements OnInit {
    DEFAULT_PAGESIZE = 8;
    totalItems: number;
    currentSearch: string;
    pageEvent: PageEvent;

    public diseaseBranches: IDiseaseBranch[];

    constructor(protected diseaseMapService: DiseaseMapService
        , protected modalService: NgbModal
        , protected router: Router
        , protected route: ActivatedRoute) { }

    load() {
        if (this.currentSearch) {
            this.diseaseMapService.searchDiseaseBranch(
                {
                    query: this.currentSearch,
                    page: this.pageEvent && this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                    size: this.pageEvent && this.pageEvent.pageSize ? this.pageEvent.pageSize : this.DEFAULT_PAGESIZE
                }
            ).subscribe((res: HttpResponse<IDiseaseBranch[]>) => this.loadSuccessHandler(res));
        } else {
            this.diseaseMapService.getAllDiseaseBranch(
                {
                    page: this.pageEvent && this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
                    size: this.pageEvent && this.pageEvent.pageSize ? this.pageEvent.pageSize : this.DEFAULT_PAGESIZE
                }
            ).subscribe((res: HttpResponse<IDiseaseBranch[]>) => this.loadSuccessHandler(res));
        }
    }

    paginate($event: PageEvent) {
        this.pageEvent = $event;
        this.load();
    }

    loadSuccessHandler(res: HttpResponse<IDiseaseBranch[]>) {
        this.diseaseBranches = res.body;
        this.totalItems = +res.headers.get('X-Total-Count');
    }

    ngOnInit() {
        this.load();
    }

    open(diseaseBranch: IDiseaseBranch) {
        const modalRef = this.modalService.open(DiseaseBranchDeleteModalComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.id = diseaseBranch.id;
        modalRef.componentInstance.name = diseaseBranch.name;
        modalRef.result.then(
            result => {
                this.load();
            },
            reason => {
                this.load();
            }
        );
    }

}

@Component({
    selector: 'jhi-disease-branch-delete-modal',
    templateUrl: './disease-branch-delete-modal.component.html'
})
export class DiseaseBranchDeleteModalComponent {

    @Input() id: number;

    @Input() name: string;

    constructor(public activeModal: NgbActiveModal
        , public diseaseMapService: DiseaseMapService) { }

    confirmDelete() {
        this.diseaseMapService.deattachDiseaseBranch(this.id)
            .subscribe(any => this.activeModal.dismiss(true));
    }

    cancel() {
        this.activeModal.close();
    }

    previousState() {
        window.history.back();
    }

}
