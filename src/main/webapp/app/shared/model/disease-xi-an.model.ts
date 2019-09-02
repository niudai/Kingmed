import { ILinkCard } from './link-card.model';
import { IPriceXiAn } from './price-xi-an.model';
import { IFile } from './file.model';

export interface IDiseaseXiAn {
    id?: number;
    subsidiary?: string;
    name?: string;
    activated?: boolean;
    linkCards?: ILinkCard[];
    applications?: IFile[];
    suppliess?: IFile[];
    prices?: IPriceXiAn[];
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
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    views: number;
}

export class DiseaseXiAn implements IDiseaseXiAn {
    applications?: IFile[];
    suppliess?: IFile[];
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    views: number;
    constructor(
        public id?: number,
        public subsidiary?: string,
        public name?: string,
        public activated?: boolean,
        public prices?: IPriceXiAn[],
        public linkCards?: ILinkCard[],
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

export const diseaseXiAnToString = (disease: IDiseaseXiAn) => {
    const str = '【项目名】: ' + disease.name + ' \n' +
        '【项目代码】: ' + disease.projectCode + ' \n' +
        '【物价编码】: ' + disease.chargeCode + ' \n' +
        '【临床应用】: ' + disease.clinicalApplication + ' \n' +
        '【样本与样本量】: ' + disease.supplement + ' \n' +
        '【耗材】: ' + disease.sample + ' \n' +
        '【分析前培训】: ' + disease.tutorial + ' \n' +
        '【运输要求】: ' + disease.transportation + ' \n' +
        '【保存条件与保存时长】: ' + disease.preservation + ' \n' +
        '【检测方法】: ' + disease.medicalMethod + ' \n' +
        '【申请单】: ' + disease.applicationUnitType + ' \n' +
        '【申请单填写注意事项】: ' + disease.applicationRemark + ' \n';
    return str;
};
