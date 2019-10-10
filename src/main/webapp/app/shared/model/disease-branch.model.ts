import { ILinkCard } from './link-card.model';

export interface IDiseaseBranch {
    id?: number;
    name?: string;
    subsidiary?: string;
    description?: string;
    linkCards?: ILinkCard[];
    diseaseMaps?: IDiseaseBranch[];
    type?: string;
}

export class DiseaseBranch implements IDiseaseBranch {
    constructor(
        public id?: number,
        public name?: string,
        public subsidiary?: string,
        public description?: string,
        public linkCards?: ILinkCard[],
        public diseaseMaps?: IDiseaseBranch[],
        public type?: string
    ) {}
}
