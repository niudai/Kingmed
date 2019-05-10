export interface IDiseaseXiAn {
    id?: number;
    subsidiary?: string;
    name?: string;
    projectCode?: string;
    chargeCode?: string;
    tollStandard?: string;
    supplement?: string;
    sample?: string;
    tutorial?: string;
    preservation?: string;
    transportation?: string;
    applicationUnitType?: string;
    applicationRemark?: string;
    medicalMethod?: string;
    projectConcourse?: string;
    hurryDepartment?: string;
    reportingTime?: string;
    clinicalApplication?: string;
    series?: string;
    subSeries?: string;
    remarks?: string;
}

export class DiseaseXiAn implements IDiseaseXiAn {
    constructor(
        public id?: number,
        public subsidiary?: string,
        public name?: string,
        public projectCode?: string,
        public chargeCode?: string,
        public tollStandard?: string,
        public supplement?: string,
        public sample?: string,
        public tutorial?: string,
        public preservation?: string,
        public transportation?: string,
        public applicationUnitType?: string,
        public applicationRemark?: string,
        public medicalMethod?: string,
        public projectConcourse?: string,
        public hurryDepartment?: string,
        public reportingTime?: string,
        public clinicalApplication?: string,
        public series?: string,
        public subSeries?: string,
        public remarks?: string
    ) {}
}
