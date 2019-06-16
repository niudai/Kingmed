import { IDiseaseBranch } from './../../shared/model/disease-branch.model';
import { DiseaseMapService } from './../disease-map.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-disease-branch',
    templateUrl: './disease-branch.component.html',
    styles: []
})
export class DiseaseBranchComponent implements OnInit {

    public diseaseBranches: IDiseaseBranch[];

    constructor(protected diseaseMapService: DiseaseMapService
        , protected modalService: NgbModal) { }

    ngOnInit() {
        this.diseaseMapService.getAllDiseaseBranch()
            .subscribe(res => this.diseaseBranches = res);
    }

    open() {
        const modalRef = this.modalService.open(DiseaseBranchDeleteModalComponent);
        modalRef.componentInstance.name = 'World';
    }

}

@Component({
    selector: 'jhi-disease-branch-create',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Hi there!</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Hello, {{name}}!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      </div>
    `
})
export class DiseaseBranchDeleteModalComponent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) { }
}
