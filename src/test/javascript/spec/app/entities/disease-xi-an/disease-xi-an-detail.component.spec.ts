/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { DiseaseXiAnDetailComponent } from 'app/entities/disease-xi-an/disease-xi-an-detail.component';
import { DiseaseXiAn } from 'app/shared/model/disease-xi-an.model';

describe('Component Tests', () => {
    describe('DiseaseXiAn Management Detail Component', () => {
        let comp: DiseaseXiAnDetailComponent;
        let fixture: ComponentFixture<DiseaseXiAnDetailComponent>;
        const route = ({ data: of({ diseaseXiAn: new DiseaseXiAn(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [DiseaseXiAnDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiseaseXiAnDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiseaseXiAnDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.diseaseXiAn).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
