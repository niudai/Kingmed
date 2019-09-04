export interface IFeedback {
    comment?: string;
    phoneNumber?: string;
    lastModifiedDate?: Date;
    _links?: {
        self?: {
            href?: string;
        }
    };
}

export class Feedback implements IFeedback {
    constructor(
        public comment?: string,
        public phoneNumber?: string
    ) {}
}
