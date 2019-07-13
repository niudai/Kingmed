export interface IRobotMessage {
    msgtype?: string;
    text?: {
        content?: string;
    };
}

export class RobotMessage implements IRobotMessage {
    constructor(
        public msgtype?: string,
        public text?: {
            content?: string;
        }
        ) {}
}
