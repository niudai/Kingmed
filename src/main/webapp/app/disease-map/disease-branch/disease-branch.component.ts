import { IDiseaseBranch } from './../../shared/model/disease-branch.model';
import { DiseaseMapService } from './../disease-map.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-disease-branch',
    templateUrl: './disease-branch.component.html',
    styleUrls: ['./disease-branch.component.css']
})
export class DiseaseBranchComponent implements OnInit {

    public diseaseBranches: IDiseaseBranch[];

    constructor(protected diseaseMapService: DiseaseMapService
        , protected modalService: NgbModal
        , protected router: Router
        , protected route: ActivatedRoute) { }

    ngOnInit() {
        this.diseaseMapService.getAllDiseaseBranch()
        .subscribe(res => this.diseaseBranches = res);
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
                this.diseaseMapService.getAllDiseaseBranch()
                    .subscribe(res => this.diseaseBranches = res);
                this.router.navigate(['./'], { relativeTo: this.route });
                this.router.navigate(['/']);
            },
            reason => {
                this.diseaseMapService.getAllDiseaseBranch()
                    .subscribe(res => this.diseaseBranches = res);
                this.router.navigate(['./'], { relativeTo: this.route });
                // this.router.navigate(['/']);
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

    previousState() {
        window.history.back();
    }

}
