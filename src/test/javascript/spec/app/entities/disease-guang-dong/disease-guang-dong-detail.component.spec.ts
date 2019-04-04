/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { DiseaseGuangDongDetailComponent } from 'app/entities/disease-guang-dong/disease-guang-dong-detail.component';
import { DiseaseGuangDong } from 'app/shared/model/disease-guang-dong.model';

describe('Component Tests', () => {
    describe('DiseaseGuangDong Management Detail Component', () => {
        let comp: DiseaseGuangDongDetailComponent;
        let fixture: ComponentFixture<DiseaseGuangDongDetailComponent>;
        const route = ({ data: of({ diseaseGuangDong: new DiseaseGuangDong(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [DiseaseGuangDongDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiseaseGuangDongDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiseaseGuangDongDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.diseaseGuangDong).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
