export interface IDiseaseGuangDong {
    id?: number;
    name?: string;
    subsidiary?: string;
    supplement?: string;
    testMethod?: string;
    sample?: string;
    roomPreservation?: string;
    coldStoragePreservation?: string;
    freezing?: string;
    clinicalApplication?: string;
    tollStandard?: string;
    reportingTime?: string;
    remarks?: string;
    chargeCode?: string;
    classification?: string;
    applicationUnitType?: string;
    series?: string;
    projectChangeNotification?: string;
    specialInspectionItems?: string;
    stopDeveloping?: string;
    projectConcourse?: string;
    testDepartment?: string;
    suppliesSeries?: string;
}

export class DiseaseGuangDong implements IDiseaseGuangDong {
    constructor(
        public id?: number,
        public name?: string,
        public subsidiary?: string,
        public supplement?: string,
        public testMethod?: string,
        public sample?: string,
        public roomPreservation?: string,
        public coldStoragePreservation?: string,
        public freezing?: string,
        public clinicalApplication?: string,
        public tollStandard?: string,
        public reportingTime?: string,
        public remarks?: string,
        public chargeCode?: string,
        public classification?: string,
        public applicationUnitType?: string,
        public series?: string,
        public projectChangeNotification?: string,
        public specialInspectionItems?: string,
        public stopDeveloping?: string,
        public projectConcourse?: string,
        public testDepartment?: string,
        public suppliesSeries?: string
    ) {}
}
