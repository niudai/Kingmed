import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiseaseGuangDongService } from '../disease-guang-dong.service';

@Component({
    selector: 'jhi-disease-guang-dong-prices-delete',
    templateUrl: './disease-guang-dong-prices-delete.component.html',
    styles: []
})
export class DiseaseGuangDongPricesDeleteComponent implements OnInit {
    id: number;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private diseaseGuangDongService: DiseaseGuangDongService) {
    }

    ngOnInit() {
        this.id = +this.activatedRoute.snapshot.paramMap.get('priceId');
    }

    cancel() {
        this.closePopup();
    }

    confirmDelete() {
        this.diseaseGuangDongService.deletePrice(this.id).subscribe();
        this.closePopup();
    }

    closePopup() {
        window.history.back();
        // this.router.navigate([{ outlets: { pricePopup: null } }]);
    }

}

@Component({
    selector: 'jhi-disease-guang-dong-prices-delete-popup',
    template: ''
})
export class DiseaseGuangDongPricesDeletePopupComponent implements OnInit, OnDestroy {

    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected modalService: NgbModal) { }

    ngOnInit() {
        setTimeout(() => {
            this.ngbModalRef = this.modalService
                .open(DiseaseGuangDongPricesDeleteComponent as Component
                    , {
                        size: 'lg',
                        backdrop: true
                    });
            this.ngbModalRef.componentInstance.id = +this.activatedRoute.snapshot.params.get('id');
            this.ngbModalRef.result.then(
                result => {
                    window.history.back();
                }
            );
        }, 0);

    }
    ngOnDestroy(): void {
        this.ngbModalRef = null;
    }
}
