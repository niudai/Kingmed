export interface IDiseaseBranch {
    id?: number;
    name?: string;
    subsidiary?: string;
    description?: string;
    diseaseMaps?: IDiseaseBranch[];
}

export class DiseaseBranch implements IDiseaseBranch {
    constructor(
        public id?: number,
        public name?: string,
        public subsidiary?: string,
        public description?: string,
        public diseaseMaps?: IDiseaseBranch[]
    ) {}
}
