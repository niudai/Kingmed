export interface IPrice {
    id?: number;
    subsidiary?: string;
    reportingTime?: string;
    tollStandard?: string;
    chargeCode?: string;
}

export class Price implements IPrice {
    constructor(
        public id?: number,
        public subsidiary?: string,
        public reportingTime?: string,
        public tollStandard?: string,
        public chargeCode?: string
    ) {}
}
