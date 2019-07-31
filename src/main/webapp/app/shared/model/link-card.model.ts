export interface ILinkCard {
    id?: number;
    articleUrl?: string;
    imageUrl?: string;
}

export class LinkCard implements ILinkCard {
    constructor(public id?: number, public articleUrl?: string, public imageUrl?: string) {}
}
