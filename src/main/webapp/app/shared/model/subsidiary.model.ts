export interface ISubsidiary {
    name?: string;
}

export class Subsidiary implements ISubsidiary {
    constructor(
        public name?: string,
    ) {}
}
