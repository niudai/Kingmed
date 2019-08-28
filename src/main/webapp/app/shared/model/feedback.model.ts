export interface IFeedback {
    comment?: string;
    phoneNumber?: string;
    _links?: {
        self?: string
    }
}

export class Feedback implements IFeedback {
    constructor(
        public comment?: string,
        public phoneNumber?: string
    ) {}
}
