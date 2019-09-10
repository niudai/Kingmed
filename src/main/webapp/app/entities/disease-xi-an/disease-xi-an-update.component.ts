import { HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { INotification, Notification } from 'app/shared/model/notification.model';
import { INtfType } from 'app/shared/model/ntf-type.model';
import { ISubsidiary, Subsidiary } from 'app/shared/model/subsidiary.model';
import { Observable } from 'rxjs';
import { DiseaseXiAnService } from './disease-xi-an.service';
import { createRequestOption } from 'app/shared';
import { NTF_TYPE_FOR_DISEASE } from 'app/shared/util/disease-ntf-util';
import { SubsidiaryService } from './subsidiary/subsidiary.service';
import { ConcourseService } from './concourse/concourse.service';
import { IConcourse } from 'app/shared/model/concourse.model';

@Component({
    selector: 'jhi-disease-xi-an-update',
    templateUrl: './disease-xi-an-update.component.html',
    styleUrls: ['./disease-xi-an-update.component.css']
})
export class DiseaseXiAnUpdateComponent implements OnInit {
    diseaseXiAn: IDiseaseXiAn;
    ntf: INotification;
    isSaving: boolean;
    ifGenerateNtf = false;
    subsidiaries: ISubsidiary[];
    concourses: IConcourse[];
    types: INtfType[];
    selectedNtfSub: ISubsidiary;
    selectedNtfType: INtfType;
    selectedSub: ISubsidiary;
    selectedConcourse: IConcourse;
    constructor(
        protected diseaseXiAnService: DiseaseXiAnService,
        protected activatedRoute: ActivatedRoute,
        protected subsidiaryService: SubsidiaryService,
        protected concourseService: ConcourseService) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
        });
        this.ntf = { title: '', description: ''};
        this.types = NTF_TYPE_FOR_DISEASE;
        this.selectedNtfType = this.types[0];
        this.loadConcourses();
        this.loadSubsidiaries();
    }

    loadConcourses() {
        this.concourseService.query().subscribe(res => {
            this.concourses = res.body._embedded.concourse;
            this.concourses.forEach(
                c => {
                    if (c.pseudoId === this.diseaseXiAn.concourseId) {
                        this.selectedConcourse = c;
                    }
                }
            );
        });
    }

    loadSubsidiaries() {
        this.diseaseXiAnService.getAllSubsidiary().subscribe(
            res => {
                this.subsidiaries = res;
                console.log(this.subsidiaries);
                this.subsidiaries.forEach(
                    sub => {
                        if (sub.id === this.diseaseXiAn.subsidiaryId) {
                            this.selectedSub = sub;
                            this.selectedNtfSub = sub;
                        }
                    }
                );
            }
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        let prms = new HttpParams();
        prms = prms.set('ifGenerate', this.ifGenerateNtf ? 'true' : 'false');
        if (this.ifGenerateNtf) {
            prms = prms.set('subsidiary.name', this.selectedNtfSub.name);
            prms = prms.set('subsidiary.id', this.selectedNtfSub.id.toString());
            prms = prms.set('title', this.ntf.title);
            prms = prms.set('type', this.selectedNtfType.type);
            prms = prms.set('description', this.ntf.description);
        }
        this.diseaseXiAn.subsidiaryId = this.selectedSub.id;
        this.diseaseXiAn.concourseId = this.selectedConcourse.pseudoId;
        if (this.diseaseXiAn.id !== undefined) {
            this.subscribeToSaveResponse(this.diseaseXiAnService.update(prms, this.diseaseXiAn));
        } else {
            this.subscribeToSaveResponse(this.diseaseXiAnService.create(prms, this.diseaseXiAn));
        }
    }

    subscribeToSaveResponse(result: Observable<HttpResponse<IDiseaseXiAn>>) {
        result.subscribe((res: HttpResponse<IDiseaseXiAn>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    onSaveError() {
        this.isSaving = false;
    }

    generateNtfToggle() {
        this.ifGenerateNtf = ! this.ifGenerateNtf;
    }
}
