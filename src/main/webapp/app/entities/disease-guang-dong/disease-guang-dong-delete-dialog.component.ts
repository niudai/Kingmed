import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';
import { DiseaseGuangDongService } from './disease-guang-dong.service';

@Component({
    selector: 'jhi-disease-guang-dong-delete-dialog',
    templateUrl: './disease-guang-dong-delete-dialog.component.html'
})
export class DiseaseGuangDongDeleteDialogComponent {
    diseaseGuangDong: IDiseaseGuangDong;

    constructor(
        protected diseaseGuangDongService: DiseaseGuangDongService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diseaseGuangDongService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'diseaseGuangDongListModification',
                content: 'Deleted an diseaseGuangDong'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-disease-guang-dong-delete-popup',
    template: ''
})
export class DiseaseGuangDongDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diseaseGuangDong }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiseaseGuangDongDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.diseaseGuangDong = diseaseGuangDong;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/disease-guang-dong', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/disease-guang-dong', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
