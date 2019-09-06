export interface ISubsidiary {
    id?: number;
    name?: string;
}

export class Subsidiary implements ISubsidiary {
    constructor(
        public id?: number,
        public name?: string
    ) {}
}
