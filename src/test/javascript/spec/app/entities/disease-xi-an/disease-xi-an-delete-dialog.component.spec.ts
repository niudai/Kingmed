/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { DiseaseXiAnDeleteDialogComponent } from 'app/entities/disease-xi-an/disease-xi-an-delete-dialog.component';
import { DiseaseXiAnService } from 'app/entities/disease-xi-an/disease-xi-an.service';

describe('Component Tests', () => {
    describe('DiseaseXiAn Management Delete Component', () => {
        let comp: DiseaseXiAnDeleteDialogComponent;
        let fixture: ComponentFixture<DiseaseXiAnDeleteDialogComponent>;
        let service: DiseaseXiAnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [DiseaseXiAnDeleteDialogComponent]
            })
                .overrideTemplate(DiseaseXiAnDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiseaseXiAnDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiseaseXiAnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
