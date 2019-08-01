export interface ILinkCard {
    id?: number;
    articleName?: string;
    subTitle?: string;
    articleUrl?: string;
    imageUrl?: string;
}

export class LinkCard implements ILinkCard {
    constructor(
        public id?: number,
        public articleName?: string,
        public subTitle?: string,
        public articleUrl?: string,
        public imageUrl?: string
    ) {}
}
