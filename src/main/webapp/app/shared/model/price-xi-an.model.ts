export interface IPriceXiAn {
    id?: number;
    subsidiary?: string;
    tollStandard?: string;
    reportingTime?: string;
    chargeCode?: string;
    subseries?: string;
    isSelected?: boolean;
}

export class PriceXiAn implements IPriceXiAn {
    constructor(
        public id?: number,
        public subsidiary?: string,
        public reportingTime?: string,
        public tollStandard?: string,
        public chargeCode?: string,
        public subseries?: string,
        public isSelected?: boolean
    ) {}
}
