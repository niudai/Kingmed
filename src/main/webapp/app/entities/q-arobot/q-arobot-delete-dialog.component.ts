import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQArobot } from 'app/shared/model/q-arobot.model';
import { QArobotService } from './q-arobot.service';

@Component({
    selector: 'jhi-q-arobot-delete-dialog',
    templateUrl: './q-arobot-delete-dialog.component.html'
})
export class QArobotDeleteDialogComponent {
    qArobot: IQArobot;

    constructor(protected qArobotService: QArobotService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qArobotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qArobotListModification',
                content: 'Deleted an qArobot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-q-arobot-delete-popup',
    template: ''
})
export class QArobotDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qArobot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QArobotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qArobot = qArobot;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/q-arobot', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/q-arobot', { outlets: { popup: null } }]);
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
