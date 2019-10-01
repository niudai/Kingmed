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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

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
    selectedSubFormControl: FormControl;

    editForm: FormGroup;
    constructor(
        protected diseaseXiAnService: DiseaseXiAnService,
        protected activatedRoute: ActivatedRoute,
        protected subsidiaryService: SubsidiaryService,
        protected concourseService: ConcourseService,
        protected errorMatcher: ErrorStateMatcher) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diseaseXiAn }) => {
            this.diseaseXiAn = diseaseXiAn;
            this.initEditForm();
            this.loadConcourses();
            this.loadSubsidiaries();
        });
        this.ntf = { title: '', description: ''};
        this.types = NTF_TYPE_FOR_DISEASE;
    }

    get name() { return this.editForm.get('name'); }
    get subsidiary() { return this.editForm.get('subsidiary'); }
    get selectedSubsidiary() { return this.editForm.get('selectedSubsidiary'); }
    get selectedConcourse() { return this.editForm.get('selectedConcourse'); }
    get projectCode() { return this.editForm.get('projectCode'); }

    initEditForm() {
        this.editForm = new FormGroup(
            {
                'name': new FormControl(this.diseaseXiAn.name, [
                    Validators.required
                ]),
                'subsidiary': new FormControl(this.diseaseXiAn.subsidiary, [
                    Validators.required
                ]),
                'selectedSubsidiary': new FormControl('', [
                    Validators.required
                ]),
                'selectedConcourse': new FormControl('', [
                    Validators.required
                ]),
                'views': new FormControl(this.diseaseXiAn.views, [
                ]),
                'projectCode': new FormControl(this.diseaseXiAn.projectCode, [
                    Validators.required
                ]),
                'chargeCode': new FormControl(this.diseaseXiAn.chargeCode, [
                ]),
                'tollStandard': new FormControl(this.diseaseXiAn.tollStandard, [
                ]),
                'supplement': new FormControl(this.diseaseXiAn.supplement, [
                ]),
                'sample': new FormControl(this.diseaseXiAn.sample, [
                ]),
                'tutorial': new FormControl(this.diseaseXiAn.tutorial, [
                ]),
                'preservation': new FormControl(this.diseaseXiAn.preservation, [
                ]),
                'transportation': new FormControl(this.diseaseXiAn.transportation, [
                ]),
                'applicationUnitType': new FormControl(this.diseaseXiAn.applicationUnitType, [
                ]),
                'applicationRemark': new FormControl(this.diseaseXiAn.applicationRemark, [
                ]),
                'medicalMethod': new FormControl(this.diseaseXiAn.medicalMethod, [
                ]),
                'projectConcourse': new FormControl(this.diseaseXiAn.projectConcourse, [
                ]),
                'hurryDepartment': new FormControl(this.diseaseXiAn.hurryDepartment, [
                ]),
                'reportingTime': new FormControl(this.diseaseXiAn.reportingTime, [
                ]),
                'clinicalApplication': new FormControl(this.diseaseXiAn.clinicalApplication, [
                ]),
                'series': new FormControl(this.diseaseXiAn.series, [
                ]),
                'subSeries': new FormControl(this.diseaseXiAn.subSeries, [
                ]),
                'remarks': new FormControl(this.diseaseXiAn.clinicalApplication, [
                ]),
                'ntf.title': new FormControl('', [
                ]),
                'ntf.description': new FormControl('', [
                ]),
                'ntf.selectedNtfSub': new FormControl(this.selectedNtfSub, [
                ]),
                'ntf.selectedNtfType': new FormControl(this.selectedNtfType, [
                ]),
            }
        );
    }

    loadConcourses() {
        this.concourseService.query().subscribe(res => {
            this.concourses = res.body._embedded.concourse;
            this.concourses.forEach(
                c => {
                    if (c.pseudoId === this.diseaseXiAn.concourseId) {
                        this.editForm.patchValue(
                            {
                                'selectedConcourse': c
                            }
                        );
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
                            this.editForm.patchValue(
                                {
                                    'selectedSubsidiary': sub,
                                    'ntf.selectedNtfSub': sub
                                }
                            );
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
        console.log('Hello');
        this.isSaving = true;
        let prms = new HttpParams();
        prms = prms.set('ifGenerate', this.ifGenerateNtf ? 'true' : 'false');
        if (this.ifGenerateNtf) {
            prms = prms.set('subsidiary.name', this.editForm.value['ntf.selectedNtfSub'].name);
            prms = prms.set('subsidiary.id', this.editForm.value['ntf.selectedNtfSub'].id.toString());
            prms = prms.set('title', this.editForm.value['ntf.title']);
            prms = prms.set('type', this.editForm.value['ntf.selectedNtfType'].type);
            prms = prms.set('description', this.editForm.value['ntf.description']);
        }
        this.diseaseXiAn.subsidiaryId = this.editForm.value['selectedSubsidiary'].id;
        this.diseaseXiAn.concourseId = this.editForm.value['selectedConcourse'].pseudoId;
        this.diseaseXiAn.name = this.editForm.value['name'];
        this.diseaseXiAn.subsidiary = this.editForm.value['subsidiary'];
        this.diseaseXiAn.views = this.editForm.value['views'];
        this.diseaseXiAn.projectCode = this.editForm.value['projectCode'];
        this.diseaseXiAn.chargeCode = this.editForm.value['chargeCode'];
        this.diseaseXiAn.tollStandard = this.editForm.value['tollStandard'];
        this.diseaseXiAn.supplement = this.editForm.value['supplement'];
        this.diseaseXiAn.sample = this.editForm.value['sample'];
        this.diseaseXiAn.tutorial = this.editForm.value['tutorial'];
        this.diseaseXiAn.preservation = this.editForm.value['preservation'];
        this.diseaseXiAn.transportation = this.editForm.value['transportation'];
        this.diseaseXiAn.applicationUnitType = this.editForm.value['applicationUnitType'];
        this.diseaseXiAn.applicationRemark = this.editForm.value['applicationRemark'];
        this.diseaseXiAn.medicalMethod = this.editForm.value['medicalMethod'];
        this.diseaseXiAn.projectConcourse = this.editForm.value['projectConcourse'];
        this.diseaseXiAn.hurryDepartment = this.editForm.value['hurryDepartment'];
        this.diseaseXiAn.reportingTime = this.editForm.value['reportingTime'];
        this.diseaseXiAn.clinicalApplication = this.editForm.value['clinicalApplication'];
        this.diseaseXiAn.series = this.editForm.value['series'];
        this.diseaseXiAn.subSeries = this.editForm.value['subSeries'];
        this.diseaseXiAn.remarks = this.editForm.value['remarks'];

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
