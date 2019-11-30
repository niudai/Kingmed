export interface IHelpLink {
    articleUrl?: string;
}

export class HelpLink implements IHelpLink {
    constructor(public articleUrl?: string) {}
}
