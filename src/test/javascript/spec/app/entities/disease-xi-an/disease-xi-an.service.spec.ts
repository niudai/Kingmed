/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DiseaseXiAnService } from 'app/entities/disease-xi-an/disease-xi-an.service';
import { IDiseaseXiAn, DiseaseXiAn } from 'app/shared/model/disease-xi-an.model';

describe('Service Tests', () => {
    describe('DiseaseXiAn Service', () => {
        let injector: TestBed;
        let service: DiseaseXiAnService;
        let httpMock: HttpTestingController;
        let elemDefault: IDiseaseXiAn;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DiseaseXiAnService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new DiseaseXiAn(
                0,
                'AAAAAAA',
                'AAAAAAA',
                null,
                null,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a DiseaseXiAn', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new DiseaseXiAn(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DiseaseXiAn', async () => {
                const returnedFromService = Object.assign(
                    {
                        subsidiary: 'BBBBBB',
                        name: 'BBBBBB',
                        projectCode: 'BBBBBB',
                        chargeCode: 'BBBBBB',
                        tollStandard: 'BBBBBB',
                        supplement: 'BBBBBB',
                        sample: 'BBBBBB',
                        tutorial: 'BBBBBB',
                        preservation: 'BBBBBB',
                        transportation: 'BBBBBB',
                        applicationUnitType: 'BBBBBB',
                        applicationRemark: 'BBBBBB',
                        medicalMethod: 'BBBBBB',
                        projectConcourse: 'BBBBBB',
                        hurryDepartment: 'BBBBBB',
                        reportingTime: 'BBBBBB',
                        clinicalApplication: 'BBBBBB',
                        series: 'BBBBBB',
                        subSeries: 'BBBBBB',
                        remarks: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of DiseaseXiAn', async () => {
                const returnedFromService = Object.assign(
                    {
                        subsidiary: 'BBBBBB',
                        name: 'BBBBBB',
                        projectCode: 'BBBBBB',
                        chargeCode: 'BBBBBB',
                        tollStandard: 'BBBBBB',
                        supplement: 'BBBBBB',
                        sample: 'BBBBBB',
                        tutorial: 'BBBBBB',
                        preservation: 'BBBBBB',
                        transportation: 'BBBBBB',
                        applicationUnitType: 'BBBBBB',
                        applicationRemark: 'BBBBBB',
                        medicalMethod: 'BBBBBB',
                        projectConcourse: 'BBBBBB',
                        hurryDepartment: 'BBBBBB',
                        reportingTime: 'BBBBBB',
                        clinicalApplication: 'BBBBBB',
                        series: 'BBBBBB',
                        subSeries: 'BBBBBB',
                        remarks: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a DiseaseXiAn', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
