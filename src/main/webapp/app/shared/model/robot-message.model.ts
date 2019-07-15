export interface IRobotMessage {
    msgtype?: string;
    text?: {
        content?: string;
        mentioned_list?: string[];
        mentioned_mobile_list?: string[];
    };
    markdown?: {
        content?: string;
    };
    news?: {
        articles?: [
            {
                title?: string,
                description?: string,
                url?: string,
                picurl?: string
            }
         ]
    };
}

export class RobotMessage implements IRobotMessage {
    constructor(
        public msgtype?: string,
        public text?: {
            content?: string;
        },
        public markdown?: {
            content?: string;
        }
        ) {}
}
