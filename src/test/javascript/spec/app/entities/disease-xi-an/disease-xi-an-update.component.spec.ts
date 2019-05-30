/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { DiseaseXiAnUpdateComponent } from 'app/entities/disease-xi-an/disease-xi-an-update.component';
import { DiseaseXiAnService } from 'app/entities/disease-xi-an/disease-xi-an.service';
import { DiseaseXiAn } from 'app/shared/model/disease-xi-an.model';

describe('Component Tests', () => {
    describe('DiseaseXiAn Management Update Component', () => {
        let comp: DiseaseXiAnUpdateComponent;
        let fixture: ComponentFixture<DiseaseXiAnUpdateComponent>;
        let service: DiseaseXiAnService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [DiseaseXiAnUpdateComponent]
            })
                .overrideTemplate(DiseaseXiAnUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiseaseXiAnUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiseaseXiAnService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DiseaseXiAn(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diseaseXiAn = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DiseaseXiAn();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diseaseXiAn = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
