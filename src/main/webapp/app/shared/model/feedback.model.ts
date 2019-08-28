export interface IFeedback {
    comment?: string;
    phoneNumber?: string;
    _links?: {
        self?: any
    };
}

export class Feedback implements IFeedback {
    constructor(
        public comment?: string,
        public phoneNumber?: string
    ) {}
}
