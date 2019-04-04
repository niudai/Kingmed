/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { DiseaseGuangDongUpdateComponent } from 'app/entities/disease-guang-dong/disease-guang-dong-update.component';
import { DiseaseGuangDongService } from 'app/entities/disease-guang-dong/disease-guang-dong.service';
import { DiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';

describe('Component Tests', () => {
    describe('DiseaseGuangDong Management Update Component', () => {
        let comp: DiseaseGuangDongUpdateComponent;
        let fixture: ComponentFixture<DiseaseGuangDongUpdateComponent>;
        let service: DiseaseGuangDongService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [DiseaseGuangDongUpdateComponent]
            })
                .overrideTemplate(DiseaseGuangDongUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiseaseGuangDongUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiseaseGuangDongService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DiseaseGuangDong(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.diseaseGuangDong = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DiseaseGuangDong();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.diseaseGuangDong = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
