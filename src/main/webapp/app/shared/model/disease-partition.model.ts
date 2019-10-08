import { ILinkCard } from './link-card.model';
import { IDiseaseBranch } from './disease-branch.model';

export interface IDiseasePartition {
    id?: number;
    name?: string;
    description?: string;
    diseaseBranches?: IDiseaseBranch[];
}

export class DiseasePartition implements IDiseasePartition {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public diseaseBranches?: IDiseaseBranch[]
    ) {}
}
