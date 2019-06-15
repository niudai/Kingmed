export interface IDiseaseBranch {
    id?: number;
    name?: string;
    diseaseMaps?: IDiseaseBranch[];
}

export class DiseaseBranch implements IDiseaseBranch {
    constructor(
        public id?: number,
        public name?: string,
        public diseaseMaps?: IDiseaseBranch[]
    ) {}
}
