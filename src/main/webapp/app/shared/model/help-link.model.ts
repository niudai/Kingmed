export interface IHelpLink {
    article_url?: string;
}

export class HelpLink implements IHelpLink {
    constructor(
        public article_url?: string,
    ) {}
}
