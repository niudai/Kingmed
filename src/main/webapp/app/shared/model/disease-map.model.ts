import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { IQArobot } from 'app/shared/model/q-arobot.model';
export interface IDiseaseMap {
    id?: number;
    name?: string;
    diseaseMaps?: IDiseaseMap[];
    qarobots?: IQArobot[];
    diseaseXiAns?: IDiseaseXiAn[];
}

export class DiseaseMap implements IDiseaseMap {
    constructor(
        public id?: number,
        public name?: string,
        public diseaseMaps?: IDiseaseMap[],
        public qarobots?: IQArobot[],
        public diseaseXiAns?: IDiseaseXiAn[]
    ) {}
}
