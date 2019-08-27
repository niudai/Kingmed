export interface IFeedback {
    comment?: string;
    phoneNumber?: string;
}

export class Feedback implements IFeedback {
    constructor(
        public comment?: string,
        public phoneNumber?: string
    ) {}
}
