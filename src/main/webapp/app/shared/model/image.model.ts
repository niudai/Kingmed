export interface IImage {
    name?: string;
    path?: string;
}

export class Image implements IImage {
    constructor(
        public name?: string,
        public path?: string
    ) {}
}
