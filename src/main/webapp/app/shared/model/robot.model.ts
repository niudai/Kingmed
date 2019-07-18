export interface IRobot {
    id?: number;
    webhookUrl?: string;
    robotName?: string;
}

export class Robot implements IRobot {
    constructor(
        public id?: number,
        public webhookUrl?: string,
        public robotName?: string
    ) {}
}
