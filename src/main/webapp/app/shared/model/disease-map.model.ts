import { IDiseaseBranch } from './disease-branch.model';
import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { IQArobot } from 'app/shared/model/q-arobot.model';
import { ILinkCard } from './link-card.model';
export interface IDiseaseMap {
    id?: number;
    name?: string;
    diseaseMaps?: IDiseaseMap[];
    linkCards?: ILinkCard[];
    subsidiary?: string;
    description?: string;
    parentDiseaseMap?: IDiseaseMap;
    parentDiseaseBranch?: IDiseaseBranch;
    qarobots?: IQArobot[];
    diseaseXiAns?: IDiseaseXiAn[];
}

export class DiseaseMap implements IDiseaseMap {
    constructor(
        public id?: number,
        public name?: string,
        public diseaseMaps?: IDiseaseMap[],
        public subsidiary?: string,
        public description?: string,
        public parentDiseaseMap?: IDiseaseMap,
        public parentDiseaseBranch?: IDiseaseBranch,
        public linkCards?: ILinkCard[],
        public qarobots?: IQArobot[],
        public diseaseXiAns?: IDiseaseXiAn[]
    ) {}
}
