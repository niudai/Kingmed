/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { QArobotUpdateComponent } from 'app/entities/q-arobot/q-arobot-update.component';
import { QArobotService } from 'app/entities/q-arobot/q-arobot.service';
import { QArobot } from 'app/shared/model/q-arobot.model';

describe('Component Tests', () => {
    describe('QArobot Management Update Component', () => {
        let comp: QArobotUpdateComponent;
        let fixture: ComponentFixture<QArobotUpdateComponent>;
        let service: QArobotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [QArobotUpdateComponent]
            })
                .overrideTemplate(QArobotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QArobotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QArobotService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QArobot(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qArobot = entity;
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
                    const entity = new QArobot();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qArobot = entity;
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
