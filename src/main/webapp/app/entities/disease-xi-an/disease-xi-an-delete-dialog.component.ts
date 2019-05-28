import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { DiseaseXiAnService } from './disease-xi-an.service';

@Component({
    selector: 'jhi-disease-xi-an-delete-dialog',
    templateUrl: './disease-xi-an-delete-dialog.component.html'
})
export class DiseaseXiAnDeleteDialogComponent {
    diseaseXiAn: IDiseaseXiAn;

    constructor(
        protected diseaseXiAnService: DiseaseXiAnService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diseaseXiAnService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'diseaseXiAnListModification',
                content: 'Deleted an diseaseXiAn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-disease-xi-an-delete-popup',
    template: ''
})
export class DiseaseXiAnDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiseaseXiAnDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.diseaseXiAn = diseaseXiAn;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/disease-xi-an', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/disease-xi-an', { outlets: { popup: null } }]);
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