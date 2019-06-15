import { IDiseaseXiAn } from 'app/shared/model/disease-xi-an.model';
import { IQArobot } from 'app/shared/model/q-arobot.model';
export interface IDiseaseMap {
    id?: number;
    name?: string;
    diseaseMaps?: IDiseaseMap[];
    qArobots?: IQArobot[];
    diseaseXiAns?: IDiseaseXiAn[];
}

export class DiseaseMap implements IDiseaseMap {
    constructor(
        public id?: number,
        public name?: string,
        public diseaseMaps?: IDiseaseMap[],
        public qArobots?: IQArobot[],
        public diseaseXiAns?: IDiseaseXiAn[]
    ) {}
}
